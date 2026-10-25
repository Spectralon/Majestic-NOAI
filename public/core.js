class World {
    /** @type {Array<Player>} */
    players = [];
    /** @type {Array<GroundItem>} */
    groundItems = [];

    constructor(players, groundItems) {
        this.players = players;
        this.groundItems = groundItems;
    }
}

class Player {
    id;
    hp;
    armor;
    ammo;
    /** @type {Array<InventoryItem>} */
    inventory = [];
    /** @type {Vector2} */
    position;

    constructor(config) {
        this.id = config.id;
        this.hp = config._hp._value;
        this.armor = config._armor._value;
        this.ammo = config._ammo._value;
        this.inventory = config.inventory._items.map(e => new InventoryItem(e));
        this.position = new Vector2(config._position.x, config._position.y);
    }
}

class GroundItem {
    id;
    item;
    /** @type {Vector2} */
    position;

    constructor(config) {
        this.id = config.id;
        this.item = new InventoryItem(config._item);
        this.position = new Vector2(config._position.x, config._position.y);
    }
}

class InventoryItem {
    id;
    type;
    count;

    constructor(config) {
        this.id = config.id;
        this.type = config.type;
        this.count = config._count;
    }
}

class Vector2 {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/**
 * @param {Vector2} pos
 * @param {Vector2} target
 * @param {number} radius
 */
function getNearPosition(pos, target, radius) {
    const delta = subtract(target, pos);
    const distance = len(delta);
    const dir = normalize(delta, distance);
    return add(multiply(dir, distance - radius), pos);
}

/**
 * @param {Vector2} v1
 * @param {Vector2} v2
 */
function add(v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
}

/**
 * @param {Vector2} v
 * @param {number} k
 */
function multiply(v, k) {
    return new Vector2(v.x * k, v.y * k);
}

/**
 * @param {Vector2} v1
 * @param {Vector2} v2
 */
function subtract(v1, v2) {
    return new Vector2(v1.x - v2.x, v1.y - v2.y);
}

/**
 * @param {Vector2} v
 * @param {number} len
 */
function normalize(v, len) {
    return new Vector2(v.x / len, v.y / len);
}

/**
 * @param {Vector2} v
 */
function len(v) {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
}
