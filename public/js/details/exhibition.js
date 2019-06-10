class ExhibitionDetail extends View {

    constructor(elementSelector, templatePath) {
        super(elementSelector, templatePath);


        this.addEventListener('click', '.hall-row', (event, target) => {
            event.stopImmediatePropagation();
            console.log('lol');
            eventService.publish('app.load', {module: 'hall', id: parseInt(target.getAttribute('data-id'))});
            //eventService.publish('user.changed', e.target.options[e.target.selectedIndex].value);
        });

    }


    notify(self, message, data) {
    }

    entryAction() {
        super.entryAction();
        let req = new Request();

        req.get('/exhibition/' + this.exhibitionID, exhibitions => {
            req.get('/exhibitionhall/' + this.exhibitionID, halls => {
                this.render({exhibition: exhibitions, halls: halls});
            })
        }, error => {
            console.log(error);
        })
    }

    setExhibitionID(exhibitionID) {
        this.exhibitionID = exhibitionID;
        return this;
    }


}