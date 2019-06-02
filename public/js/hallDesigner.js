class HallDesigner {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = this.canvas.getContext('2d');
        //  this.context.fillRect(1,1,5,5);
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    draw() {
        // this.clear();

    }
}