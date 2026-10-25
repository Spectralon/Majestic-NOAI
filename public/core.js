class World {
    players = [];
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
    inventory = [];
    x;
    y;

    constructor(config) {
        this.id = config.id;
        this.hp = config._hp._value;
        this.armor = config._armor._value;
        this.ammo = config._ammo._value;
        this.inventory = config.inventory._items.map(e => new InventoryItem(e));
        this.x = config._position.x;
        this.y = config._position.y;
    }
}

class GroundItem {
    id;
    item;
    x;
    y;

    constructor(config) {
        this.id = config.id;
        this.item = new InventoryItem(config._item);
        this.x = config._position.x;
        this.y = config._position.y;
    }
}

class InventoryItem {
    type;
    count;

    constructor(config) {
        this.type = config.type;
        this.count = config._count;
    }
}