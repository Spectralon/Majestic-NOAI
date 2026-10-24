import {IItem} from "../abstract";
import {Player} from "../Player";
import {IEffectService} from "../../services/EffectService";

export class Bandage implements IItem {
    readonly type: string = 'bandage';
    readonly stackable: boolean = true;

    constructor(
        private readonly _effectService: IEffectService,
    ) {
    }

    onUse(player: Player) {
        this._effectService.addEffect(this.type, player);
    }
}