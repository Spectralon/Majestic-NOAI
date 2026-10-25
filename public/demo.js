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

    huntDrop(player(0), groundItem(0));
    huntDrop(player(1), groundItem(1));

    while (true) {
        const p1p1 = player(0).position;
        const p2p1 = player(1).position;
        await forMs(500);
        const p1p2 = player(0).position;
        const p2p2 = player(1).position;
        if (len(subtract(p1p2, p1p1)) + len(subtract(p2p2, p2p1)) <= 0.01)
            break;
    }

    pickupItem(player(0).id, groundItem(0).id);
    pickupItem(player(1).id, groundItem(1).id);

    await forMs(500);

    useItem(player(0).id, player(0).inventory[0].id);
    useItem(player(1).id, player(1).inventory[0].id);

    // spawnDrop();
    //
    // let item3;
    //
    // movePlayerNear(player1.id, item3.x, item3.y);
    // movePlayerNear(player2.id, item3.x, item3.y);
    //
    // pickupItem(player1.id, item3.id);
    // pickupItem(player2.id, item3.id);

    function player(i) {
        return state.players[i];
    }

    function groundItem(i) {
        return state.groundItems[i];
    }
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

function pickupItem(playerId, groundItemId) {
    sendMessage({type: "pickup", playerId: playerId, groundItemId: groundItemId});
}

function useItem(playerId, itemId) {
    sendMessage({type: "use", playerId: playerId, itemId: itemId});
}

function huntDrop(player, item) {
    movePlayer(player.id, getNearPosition(player.position, item.position, config.PLAYER.groundItemsPickupRadius * 0.9));
}

async function forMs(timeoutMs = 1000) {
    return new Promise(resolve => setTimeout(resolve, timeoutMs));
}
