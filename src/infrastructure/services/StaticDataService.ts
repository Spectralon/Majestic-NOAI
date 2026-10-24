import {ClampedNumber} from "../../game/objects/core";

export class StaticDataService {
    readonly config = {
        SERVER: {
            wsPort: 3443,
        },
        PLAYER: {
            hp: new ClampedNumber(0, 100, 50),
            armor: new ClampedNumber(0, 100, 50),
            ammo: new ClampedNumber(0, 20, 10),
            groundItemsPickupRadius: 10,
        },
        WORLD: {
            width: 1280,
            height: 720,
            tickIntervalMs: 100,
        },
        ITEMS: {
            prototypes: {
                medkit: {},
                armor: {addArmor: 10},
                bandage: {},
                ammo: {addAmmo: 10},
            },
            groundLifetimeTicks: 600,
        },
        EFFECTS: {
            bandage: {hpPerTick: 10, ttl: 10}
        },
    } as const;
}