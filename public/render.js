const canvasRoot = document.getElementById("world");
const canvas = canvasRoot.getContext("2d");

let scale = 1;

function draw(state) {
    let safeBorder = 30;
    scale = window.innerWidth / config.WORLD.width;
    canvasRoot.width = sc(config.WORLD.width - safeBorder);
    canvasRoot.height = sc(config.WORLD.height - safeBorder);
    drawField();
    for (let item of state.groundItems)
        drawItem(item);
    for (let player of state.players)
        drawPlayer(player);
}

function drawField() {
    canvas.fillStyle = config.WORLD.color;
    canvas.fillRect(0, 0, sc(config.WORLD.width), sc(config.WORLD.height));
}

function drawItem(groundItem) {
    let x = sc(groundItem.position.x);
    let y = sc(groundItem.position.y);
    let r = sc(config.ITEMS.radius);

    canvas.beginPath();
    canvas.arc(x, y, r, 0, 2 * Math.PI);
    canvas.fillStyle = config.ITEMS.prototypes[groundItem.item.type].color;
    canvas.fill();
}

function drawPlayer(player) {
    let barHeight = sc(4);
    let barInterval = sc(2);

    let x = sc(player.position.x);
    let y = sc(player.position.y);
    let r = sc(config.PLAYER.radius);

    canvas.beginPath();
    canvas.arc(x, y, r, 0, 2 * Math.PI);
    canvas.fillStyle = config.PLAYER.color;
    canvas.fill();

    for (let i = 0; i < player.inventory.length; i++)
        drawInvItem(player, i);

    drawLabel(player);
    drawHP(player);
    drawArmor(player);
    drawAmmo(player);

    function drawInvItem(player, idx) {
        const item = player.inventory[idx];
        const angle = 2 * idx * Math.PI / player.inventory.length;
        const xi = x + r * Math.cos(angle) * 0.8;
        const yi = y + r * Math.sin(angle) * 0.8;
        const ri = sc(config.ITEMS.radius * item.count / 5);

        canvas.beginPath();
        canvas.arc(xi, yi, ri, 0, 2 * Math.PI);
        canvas.fillStyle = config.ITEMS.prototypes[item.type].color;
        canvas.fill();
    }

    function drawLabel(player) {
        canvas.fillStyle = "gray";
        canvas.font = "12px monospace";
        canvas.fillText(player.id, x - r, y - r - barInterval * 2);
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