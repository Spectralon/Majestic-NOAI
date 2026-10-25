

let config = {};
let state = new World();
let output = [];

const ws = new WebSocket('ws://localhost:3443');
ws.onopen = () => {
    console.log('Connected');
};
ws.onerror = (e) => {
    console.error('Error:', e);
};
ws.onmessage = (e) => {
    processMessage(JSON.parse(e.data));
};

function processMessage(e) {
    switch (e.type) {
        case 'result':
            output.push(e.data);
            break;
        case 'config':
            config = e.data;
            break;
        case 'tick':
            state = getState(e.data);
            draw(state);
            break;
        default:
            console.warn('Unable to process message:', e);
            break;
    }
}

async function sendMessage(data, awaitResult = false) {
    if (!awaitResult) {
        ws.send(JSON.stringify(data));
        return;
    }
    const ts = Date.now();
    ws.send(JSON.stringify({"ts": ts, ...data}));
    while (true) {
        await forMs(10);
        let result = output.find(e => e.ts === ts);
        if (!result)
            continue;
        return Promise.resolve(result.data);
    }
}

function getState(data) {
    const players = data._entities.filter(e => e.kind === 'player').map(e => new Player(e));
    const groundItems = data._entities.filter(e => e.kind === 'ground_item').map(e => new GroundItem(e));
    return new World(players, groundItems);
}

async function forMs(timeoutMs = 1000) {
    return new Promise(resolve => setTimeout(resolve, timeoutMs));
}