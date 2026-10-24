import {StaticDataService} from "./services/StaticDataService";
import {GameFactory} from "./GameFactory";
import {GameRegistry, IGameRegistry} from "./services/GameRegistry";
import {EffectService, IEffectService} from "../game/services/EffectService";
import {GameLoop} from "./GameLoop";
import {CommandService} from "./services/CommandService";
import {IInventoryService, InventoryService} from "../game/services/InventoryService";
import {GroundItemService, IGroundItemService} from "../game/services/GroundItemService";
import {EntityMovementService, IEntityMovementService} from "../game/services/EntityMovementService";
import {GameServer} from "./GameServer";

export class BootstrapService {
    async main(): Promise<void> {
        const staticData: StaticDataService = new StaticDataService();
        const registry: IGameRegistry = new GameRegistry();
        const factory: GameFactory = new GameFactory(registry, staticData);
        const gameLoop = new GameLoop(staticData);

        const movementService: IEntityMovementService = new EntityMovementService(registry);
        const inventoryService: IInventoryService = new InventoryService(registry, factory);
        const groundItemService: IGroundItemService = new GroundItemService(registry, factory, gameLoop, inventoryService, staticData);
        const effectService: IEffectService = new EffectService(factory, gameLoop);

        const commandService: CommandService = new CommandService();
        const server: GameServer = new GameServer(commandService, staticData);

        factory.init(effectService);
        commandService.init(
            factory,
            gameLoop,
            staticData,
            inventoryService,
            groundItemService,
            movementService,
        );

        await server.start();
        gameLoop.start();
    }
}