class HallDetail extends View {

    constructor(elementSelector, templatePath) {
        super(elementSelector, templatePath);

        this.addEventListener('click', '#save', (event) => {
            this.hall.shapes = this.hd.shapes;
            let req = new Request();
            req.put("/hall", this.hall, data => {
                console.log(data);
            }, error => {
                conole.log(error);
            })

        });


        this.addEventListener('click', '#free', (event) => {
            console.log(this.hd.selectedShape);
            this.hd.deleteShape(this.hd.selectedShape);
        });


        this.addEventListener('click', '#accept', (event) => {

            console.log();

            let req = new Request();
            req.get('/reservation/' + this.hd.selectedShape.reservationID, reservation => {

                reservation.accepted = 1;


                req.put("/reservation", reservation, data => {
                    console.log(data);
                    this.hd.selectedShape.status = ShapeTypes.ACCEPTED;


                    this.hall.shapes = this.hd.shapes;
                    let req = new Request();
                    req.put("/hall", this.hall, data => {
                        console.log(data);
                    }, error => {
                        conole.log(error);
                    })


                }, error => {
                    conole.log(error);
                })


            })


        });


        this.addEventListener('click', '#unreserve', (event) => {
            console.log(this.hd.selectedShape);
            let req = new Request();
            req.delete();
            this.hd.deleteShape(this.hd.selectedShape);
        });


        this.addEventListener('click', '#reserve', (event) => {
            let plannedReservations = (this.hd.shapes.filter(s => s.status == ShapeTypes.RESERVED));

            this.hall.shapes = this.hd.shapes;
            let req = new Request();
            let names = ["Software", "Dev", "Studio", "Ubi", "Micro", "Tech", "Brand"];
            plannedReservations.forEach(shape => {
                let reservation = {
                    creator: names[getRandomInt(names.length - 1)] + " " + names[getRandomInt(names.length - 1)],
                    hallID: this.hall.entryid
                };
                console.log(reservation);

                // let fetchSrgs = [];
                // fetchSrgs.push({
                //     path: "/reservation", options: {
                //         method: "POST",
                //         cache: "no-cache",
                //         body: JSON.stringify(reservation),
                //         headers: {
                //             'Content-Type': 'application/json',
                //             // 'Content-Type': 'application/x-www-form-urlencoded',
                //         },
                //     }
                // });
                //
                // fetchSrgs.push({
                //     path: "/hall", options: {
                //         method: "PUT",
                //         cache: "no-cache",
                //         body: JSON.stringify(this.hall),
                //         headers: {
                //             'Content-Type': 'application/json',
                //             // 'Content-Type': 'application/x-www-form-urlencoded',
                //         }
                //     }
                // })
                // req.multi(fetchSrgs, (reservation, hall) => {
                //     console.log(reservation);
                //     console.log(hall);
                // }, error => {
                //     console.log(error);
                // });

                req.post("/reservation", (reservation), data => {

                    shape.setReservationID(data.entryid);


                    req.put("/hall", this.hall, data => {
                        console.log(data);
                    }, error => {
                        conole.log(error);
                    })

                }, error => {
                    console.log(error);
                });

            });

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
                let shape = new Shape(element.x, element.y, element.w, element.h, element.y);
                if (element.reservationID) {
                    shape.setReservationID(element.reservationID);
                }
                if (element.status) {
                    shape.setStatus(element.status);
                }
                this.hd.addShape(shape);
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