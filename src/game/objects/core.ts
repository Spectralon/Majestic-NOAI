export class Vector2 {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class ClampedNumber {
    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = Math.min(Math.max(value, this._min), this._max);
    }

    private _value: number;

    constructor(
        private readonly _min: number,
        private readonly _max: number,
        private readonly _initial: number = 0,
    ) {
        this._value = this._initial;
    }
}