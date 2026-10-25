const canvasRoot = document.getElementById("world");
const canvas = canvasRoot.getContext("2d");

let config = {};
let state = {};

let scale = 1;

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

function sendMessage(data) {
    ws.send(JSON.stringify(data));
}

function draw(state) {
    let safeBorder = 30;
    scale = window.innerWidth / config.WORLD.width;
    canvasRoot.width = sc(config.WORLD.width - safeBorder);
    canvasRoot.height = sc(config.WORLD.height - safeBorder);
    drawField();
    for (let player of state.players)
        drawPlayer(player);
    for (let item of state.groundItems)
        drawItem(item);
}

function drawField() {
    canvas.fillStyle = config.WORLD.color;
    canvas.fillRect(0, 0, sc(config.WORLD.width), sc(config.WORLD.height));
}

function drawItem(groundItem) {
    canvas.beginPath();
    let x = sc(groundItem.x);
    let y = sc(groundItem.y);
    let r = sc(config.ITEMS.radius);
    canvas.arc(x, y, r, 0, 2 * Math.PI);
    canvas.fillStyle = config.ITEMS.prototypes[groundItem.item.type].color;
    canvas.fill();
}

function drawPlayer(player) {
    let barHeight = sc(4);
    let barInterval = sc(2);

    canvas.beginPath();
    let x = sc(+player.x);
    let y = sc(+player.y);
    let r = sc(config.PLAYER.radius);

    canvas.arc(x, y, r, 0, 2 * Math.PI);
    canvas.fillStyle = config.PLAYER.color;
    canvas.fill();

    drawLabel(player);
    drawHP(player);
    drawArmor(player);
    drawAmmo(player);

    function drawLabel(player) {
        canvas.fillStyle = "gray";
        canvas.font = "12px monospace";
        canvas.fillText(player.id, x - r, y - r - barInterval);
    }

    function drawHP(player) {
        canvas.fillStyle = "red";
        const percentage = player.hp / config.PLAYER.hp._max;
        canvas.fillRect(x - r, barYPositionByIndex(0), 2 * r * percentage, barHeight);
    }

    function drawArmor(player) {
        canvas.fillStyle = "blue";
        const percentage = player.armor / config.PLAYER.armor._max;
        canvas.fillRect(x - r, barYPositionByIndex(1), 2 * r * percentage, barHeight);
    }

    function drawAmmo(player) {
        canvas.fillStyle = "green";
        const percentage = player.ammo / config.PLAYER.ammo._max;
        canvas.fillRect(x - r, barYPositionByIndex(2), 2 * r * percentage, barHeight);
    }

    function barYPositionByIndex(i) {
        return y + r + barInterval * (i + 1) + barHeight * i;
    }
}

function sc(value) {
    return value * scale;
}

function getState(data) {
    const players = data._entities.filter(e => e.kind === 'player').map(e => new Player(e));
    const groundItems = data._entities.filter(e => e.kind === 'ground_item').map(e => new GroundItem(e));
    return new World(players, groundItems);
}