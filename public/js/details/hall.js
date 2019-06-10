class HallDetail extends View {

    entryAction() {
        super.entryAction();
        let req = new Request();

        req.get('/hall/' + this.hallID, hall => {

            this.render(hall);
            this.hd = new HallDesigner(document.getElementById('halls'));

        }, error => {
            console.log(error);
        })
    }

    setHallID(hallID) {
        this.hallID = hallID;
        return this;
    }


}