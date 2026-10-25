import {ClampedNumber} from "../../game/objects/core";

export class StaticDataService {
    readonly config = {
        SERVER: {
            wsPort: 3443,
        },
        PLAYER: {
            color: "#1d395b",
            radius: 20,
            hp: new ClampedNumber(0, 100, 50),
            armor: new ClampedNumber(0, 100, 50),
            ammo: new ClampedNumber(0, 20, 10),
            groundItemsPickupRadius: 40
        },
        WORLD: {
            color: "#adffff",
            width: 1280,
            height: 720,
            tickIntervalMs: 100,
        },
        ITEMS: {
            prototypes: {
                medkit: {color: "#ffffff"},
                armor: {color: "#838bff", addArmor: 10},
                bandage: {color: "#e5e5e5"},
                ammo: {color: "#86ff83", addAmmo: 10},
            },
            groundLifetimeTicks: 200,
            radius: 10,
        },
        EFFECTS: {
            bandage: {hpPerTick: 10, ttl: 10}
        },
    } as const;
}