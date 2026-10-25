const demoButton = document.getElementById("demo");
demoButton.onclick = startDemo;

async function startDemo() {
    spawnPlayer();
    spawnPlayer();

    spawnDrop();
    spawnDrop();
    spawnDrop();

    await forMs();

    let player1 = state.players[0];
    let player2 = state.players[1];
    let item1 = state.groundItems[0];
    let item2 = state.groundItems[1];

    movePlayer(player1.id, getNearPosition(player1.position, item1.position, config.PLAYER.groundItemsPickupRadius));
    movePlayer(player2.id, getNearPosition(player2.position, item2.position, config.PLAYER.groundItemsPickupRadius));

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

async function forMs(timeoutMs = 1000) {
    return new Promise(resolve => setTimeout(resolve, timeoutMs));
}
