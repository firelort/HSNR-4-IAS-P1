// Für Hallen, Fußwege usw.
class Shape {
    constructor(x, y, w, h, fill) {
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 1;
        this.h = h || 1;
        this.fill = fill || '#AAAAAA';
    }

    draw(context) {
        context.fillStyle = this.fill;
        context.fillRect(this.x, this.y, this.w, this.h);
    }

    contains(mouseX, mouseY) {
        return (this.x <= mouseX) && (this.x + this.w >= mouseX) &&
            (this.y <= mouseY) && (this.y + this.h >= mouseY);
    }
}


class HallDesigner {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = this.canvas.getContext('2d');


        this.valid = false; // neuzeichenn falls false
        this.shapes = [];  // hallen usw


        this.draw();

        this.setHandlers();

        this.interval = 30;
        setInterval(function () {
            this.draw();
        }.bind(this), this.interval);


    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    draw() {

        if (!this.valid) {
            let ctx = this.context;
            let shapes = this.shapes;
            this.clear();

            // gitter

            for (let x = 0; x <= this.width; x += 40) {
                this.context.moveTo(0.5 + x, 0);
                this.context.lineTo(0.5 + x, this.height);
            }


            for (let x = 0; x <= this.height; x += 40) {
                this.context.moveTo(0, 0.5 + x);
                this.context.lineTo(this.width, 0.5 + x);
            }

            this.context.stroke();

            // cursor "anker"
            if (this.anchor) {
                this.context.fillRect(this.anchor.x, this.anchor.y, 10, 10);
            }

            // dockingpunkt fürs zeichnen
            // und preview für auswahl
            if (this.dragStart) {
                this.context.fillRect(this.dragStart.x, this.dragStart.y, 10, 10);
                ctx.strokeRect(this.dragStart.x + 5, this.dragStart.y + 5, this.anchor.x - this.dragStart.x, this.anchor.y - this.dragStart.y);
            }

            // alles shapes zeichnen
            let l = shapes.length;
            for (let i = 0; i < l; i++) {
                let shape = shapes[i];
                // shapes ausserhalb skippen (sollte eigentlich nicht vorkommen)
                if (shape.x > this.width || shape.y > this.height ||
                    shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
                shapes[i].draw(ctx);
            }

            this.valid = true;
        }

    }


    getMouse(e) {
        let element = this.canvas;
        let offsetX = 0;
        let offsetY = 0;
        let mx;
        let my;

        // durch die offsets der eltern elemente gehen umd richtige position zu bestimmen
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

    addShape(shape) {
        this.shapes.push(shape);
        this.valid = false;
    }


    setHandlers() {
        this.canvas.addEventListener('mousedown', function (e) {
            let mouse = this.getMouse(e);
            //satrtpunkt setzen
            if (!this.dragStart) {
                this.dragStart = {x: Math.round(mouse.x / 40) * 40 - 5, y: Math.round(mouse.y / 40) * 40 - 5}
            }

        }.bind(this), true);
        this.canvas.addEventListener('mousemove', function (e) {
            //anker setzen
            let mouse = this.getMouse(e);
            this.anchor = {x: Math.round(mouse.x / 40) * 40 - 5, y: Math.round(mouse.y / 40) * 40 - 5};
            this.valid = false;
        }.bind(this), true);
        this.canvas.addEventListener('mouseup', function (e) {
            // preview setzen und dragStart löschen
            this.addShape(new Shape(this.dragStart.x + 6, this.dragStart.y + 6, this.anchor.x - this.dragStart.x - 1, this.anchor.y - this.dragStart.y - 1));
            delete this.dragStart;
        }.bind(this), true);
    }
}