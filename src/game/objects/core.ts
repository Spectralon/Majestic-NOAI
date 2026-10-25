export class Vector2 {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    multiply(k: number): Vector2 {
        return new Vector2(this.x * k, this.y * k);
    }

    len(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vector2 {
        return this.multiply(1 / this.len());
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

export class Constants {
    static TOLERANCE: number = 0.1;
}