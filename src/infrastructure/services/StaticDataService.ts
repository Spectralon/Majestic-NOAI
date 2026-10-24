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
        tickIntervalMs: 100,
    } as const;
}