import {StaticDataService} from "./services/StaticDataService";
import {GameFactory} from "./GameFactory";
import {GameRegistry, IGameRegistry} from "./services/GameRegistry";
import {EffectService, IEffectService} from "../game/services/EffectService";
import {GameLoop} from "./GameLoop";
import {CommandService} from "./services/CommandService";
import {IInventoryService, InventoryService} from "../game/services/InventoryService";
import {GroundItemService, IGroundItemService} from "../game/services/GroundItemService";
import {EntityMovementService, IEntityMovementService} from "../game/services/EntityMovementService";

export class BootstrapService {
    async main(): Promise<void> {
        const staticDataService: StaticDataService = new StaticDataService();
        const registry: IGameRegistry = new GameRegistry();
        const factory: GameFactory = new GameFactory(registry, staticDataService);

        const gameLoop = new GameLoop(staticDataService);

        const movementService: IEntityMovementService = new EntityMovementService(registry);
        const inventoryService: IInventoryService = new InventoryService(registry, factory);
        const groundItemService: IGroundItemService = new GroundItemService(registry, factory, gameLoop, inventoryService);
        const effectService: IEffectService = new EffectService(factory, gameLoop);

        const commandService: CommandService = new CommandService();

        factory.init(effectService);
        commandService.init(inventoryService, groundItemService, movementService)
    }
}