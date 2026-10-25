const demoButton = document.getElementById("demo");
demoButton.onclick = startDemo;

async function startDemo() {
    const pid1 = await spawnPlayer();
    const pid2 = await spawnPlayer();

    const did1 = await spawnDrop();
    const did2 = await spawnDrop();
    spawnDrop();

    await forMs();

    await Promise.all([
        huntDrop(player(pid1), groundItem(did1)),
        huntDrop(player(pid2), groundItem(did2))
    ]);

    await forMs(500);

    useItem(pid1, player(pid1).inventory[0]?.id);
    useItem(pid2, player(pid2).inventory[0]?.id);

    const did3 = await spawnDrop();
    await forMs(500);

    await Promise.all([
        goNear(player(pid1), groundItem(did3)),
        goNear(player(pid2), groundItem(did3))
    ]);

    pickupItem(pid1, did3);
    pickupItem(pid2, did3);
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

async function huntDrop(player, item) {
    await goNear(player, item);
    pickupItem(player.id, item.id);
}

async function goNear(player, item) {
    movePlayer(player.id, getNearPosition(player.position, item.position, config.PLAYER.groundItemsPickupRadius * 0.9));
    await stopped_(player.id);
}

async function stopped_(playerId) {
    while (true) {
        const p1 = player(playerId).position;
        await forMs(500);
        const p2 = player(playerId).position;
        if (len(subtract(p2, p1)) <= 0.01)
            break;
    }
}

async function stopped(pid1, pid2) {
    while (true) {
        const p1p1 = player(pid1).position;
        const p2p1 = player(pid2).position;
        await forMs(500);
        const p1p2 = player(pid1).position;
        const p2p2 = player(pid2).position;
        if (len(subtract(p1p2, p1p1)) + len(subtract(p2p2, p2p1)) <= 0.01)
            break;
    }
}

function player(id) {
    return state.players.find(p => p.id === id);
}

function groundItem(id) {
    return state.groundItems.find(p => p.id === id);
}
