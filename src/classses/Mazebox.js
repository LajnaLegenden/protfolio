export default class Mazebox {
    constructor(x, y, vue) {
        this.x = x;
        this.y = y;
        this.vue = vue;
        this.f = 0;
        this.h = 0;
        this.g = 0;
        this.debug = "";
        this.parent = undefined;
        this.visited = false;
        this.closed = false;

    }
}