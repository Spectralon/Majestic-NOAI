export class StaticDataService {
    readonly config = {
        ITEMS: {
            prototypes: {
                medkit: {},
                armor: {},
                bandage: {},
                flare: {},
            },
            groundLifetimeTicks: 600,
        },
        EFFECTS: {
            bandage: {ttl: 10}
        },
        tickIntervalMs: 100,
    } as const;
}