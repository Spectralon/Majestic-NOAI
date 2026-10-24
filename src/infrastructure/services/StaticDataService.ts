export class StaticDataService {
    readonly config = {
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
        tickIntervalMs: 100,
        groundItemsPickupRadius: 10,
    } as const;
}