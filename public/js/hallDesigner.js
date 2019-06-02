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

    getMouse(e) {
        let element = this.canvas;
        let offsetX = 0;
        let offsetY = 0;
        let mx;
        let my;


        if (element.offsetParent !== undefined) {
            do {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
        }

        mx = e.pageX - offsetX;
        my = e.pageY - offsetY;

        return {x: mx, y: my};
    }
}