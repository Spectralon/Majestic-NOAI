const demoButton = document.getElementById("demo");
demoButton.onclick = startDemo;

async function startDemo() {
    demoButton.disabled = true;

    spawnPlayer();
    spawnPlayer();

    spawnDrop();
    spawnDrop();
    spawnDrop();

    await forMs();

    huntDrop(state.players[0], state.groundItems[0]);
    huntDrop(state.players[1], state.groundItems[1]);

    while (true) {
        const p1p1 = state.players[0].position;
        const p2p1 = state.players[1].position;
        await forMs(500);
        const p1p2 = state.players[0].position;
        const p2p2 = state.players[1].position;
        if (len(subtract(p1p2, p1p1)) + len(subtract(p2p2, p2p1)) <= 0.01)
            break;
    }

    // pickupItem(player1.id, item1.id);
    // pickupItem(player2.id, item2.id);
    //
    // useItem(player1.id, item1.id);
    // useItem(player2.id, item2.id);
    //
    // spawnDrop();
    //
    // let item3;
    //
    // movePlayerNear(player1.id, item3.x, item3.y);
    // movePlayerNear(player2.id, item3.x, item3.y);
    //
    // pickupItem(player1.id, item3.id);
    // pickupItem(player2.id, item3.id);
}

function spawnPlayer() {
    sendMessage({type: "spawn"});
}

function spawnDrop() {
    sendMessage({type: "spawn_item"});
}

function movePlayer(id, position) {
    sendMessage({type: "move", playerId: id, x: position.x, y: position.y});
}

function huntDrop(player, item) {
    movePlayer(player.id, getNearPosition(player.position, item.position, config.PLAYER.groundItemsPickupRadius));
}

async function forMs(timeoutMs = 1000) {
    return new Promise(resolve => setTimeout(resolve, timeoutMs));
}
