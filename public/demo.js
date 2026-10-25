const demoButton = document.getElementById("demo");
demoButton.onclick = startDemo;

async function startDemo() {
    const pid1 = await spawnPlayer();
    const pid2 = await spawnPlayer();

    const did1 = await spawnDrop();
    const did2 = await spawnDrop();
    spawnDrop();

    await forMs();

    huntDrop(player(pid1), groundItem(did1));
    huntDrop(player(pid2), groundItem(did2));

    while (true) {
        const p1p1 = player(pid1).position;
        const p2p1 = player(pid2).position;
        await forMs(500);
        const p1p2 = player(pid1).position;
        const p2p2 = player(pid2).position;
        if (len(subtract(p1p2, p1p1)) + len(subtract(p2p2, p2p1)) <= 0.01)
            break;
    }

    pickupItem(pid1, did1);
    pickupItem(pid2, did2);

    await forMs(500);

    useItem(pid1, player(pid1).inventory[0].id);
    useItem(pid2, player(pid2).inventory[0].id);

    // spawnDrop();
    //
    // let item3;
    //
    // movePlayerNear(player1.id, item3.x, item3.y);
    // movePlayerNear(player2.id, item3.x, item3.y);
    //
    // pickupItem(player1.id, item3.id);
    // pickupItem(player2.id, item3.id);

    function player(id) {
        return state.players.find(p => p.id === id);
    }

    function groundItem(id) {
        return state.groundItems.find(p => p.id === id);
    }
}

async function spawnPlayer() {
    return sendMessage({type: "spawn"}, true);
}

async function spawnDrop() {
    return await sendMessage({type: "spawn_item"}, true);
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
