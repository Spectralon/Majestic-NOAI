const demoButton = document.getElementById("demo");
demoButton.onclick = startDemo;

function startDemo() {
    spawnPlayer();
    spawnPlayer();

    spawnDrop();
    spawnDrop();
    spawnDrop();

    // let player1;
    // let player2;
    // let item1;
    // let item2;
    //
    // movePlayerNear(player1.id, item1.x, item1.y);
    // movePlayerNear(player2.id, item2.x, item2.y);
    //
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
