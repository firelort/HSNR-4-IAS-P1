class HallDetail extends View {

    constructor(elementSelector, templatePath) {
        super(elementSelector, templatePath);

        this.addEventListener('click', '#save', (event) => {
            this.hall.shapes = this.hd.shapes;
            console.log(this.hd.shapes);
            console.log(this.hall);
            let req = new Request();
            req.put("/hall", this.hall, data => {
                console.log(data);
            }, error => {
                conole.log(error);
            })

        });

    }


    entryAction() {
        super.entryAction();
        let req = new Request();

        req.get('/hall/' + this.hallID, hall => {
            this.hall = hall;
            this.render(hall);
            this.hd = new HallDesigner(document.getElementById('halls'));
            hall.shapes.forEach(element => {
                this.hd.addShape(new Shape(element.x, element.y, element.w, element.h, element.y));
            })

        }, error => {
            console.log(error);
        })
    }

    setHallID(hallID) {
        this.hallID = hallID;
        return this;
    }


}