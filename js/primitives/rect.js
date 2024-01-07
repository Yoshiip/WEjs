class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    expands(value) {
        this.x -= value / 2;
        this.y -= value / 2;
        this.w += value / 2;
        this.h += value / 2;
    }

    toString() {
        return this.x + "," + this.y + "," + this.w + "," + this.h;
    }
}