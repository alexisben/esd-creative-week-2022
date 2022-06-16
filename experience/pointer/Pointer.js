class Pointer {
    constructor () {
        this._x = 0;
        this._y = 0;

        window.addEventListener('pointermove', this.onMove.bind(this));
    }
    get ratio () {
        return {
            x: (this._x / window.innerWidth) * 2 - 1,
            y: (this._y / window.innerHeight) * -2 + 1
        }
    }
    onMove(event) {
        this._x = event.clientX;
        this._y = event.clientY;
    }
}

export default new Pointer();