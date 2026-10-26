import {StaticDataService} from "./services/StaticDataService";
import {GameFactory} from "./GameFactory";
import {GameRegistry, IGameRegistry} from "./services/GameRegistry";
import {EffectService, IEffectService} from "../game/services/EffectService";
import {GameLoop} from "./GameLoop";
import {CommandService} from "../server/CommandService";
import {IInventoryService, InventoryService} from "../game/services/InventoryService";
import {GroundItemService, IGroundItemService} from "../game/services/GroundItemService";
import {EntityMovementService, IEntityMovementService} from "../game/services/EntityMovementService";
import {GameServer} from "../server/GameServer";
import {IStorage} from "../storage/IStorage";
import {RuntimeStorage} from "../storage/RuntimeStorage";

export class BootstrapService {
    async main(): Promise<void> {
        const staticData: StaticDataService = new StaticDataService();
        const storage: IStorage = new RuntimeStorage(staticData);
        const registry: IGameRegistry = new GameRegistry();
        const factory: GameFactory = new GameFactory(registry, staticData);
        const gameLoop = new GameLoop(storage, staticData);

        const movementService: IEntityMovementService = new EntityMovementService(gameLoop);
        const inventoryService: IInventoryService = new InventoryService(factory, gameLoop);
        const groundItemService: IGroundItemService = new GroundItemService(factory, inventoryService, gameLoop, staticData);
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

        gameLoop.on('tick', world => server.broadcast('tick', world));

        await server.start();
        gameLoop.start();
    }
}