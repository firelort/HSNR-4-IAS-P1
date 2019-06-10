class ExhibitionList extends View {

    constructor(elementSelector, templatePath) {
        super(elementSelector, templatePath);


        this.addEventListener('click', '.selectable-row', (event, target) => {
            event.stopImmediatePropagation();
            eventService.publish('app.load', {module: 'exhibition', id: parseInt(target.getAttribute('data-id'))});
            //eventService.publish('user.changed', e.target.options[e.target.selectedIndex].value);
        });

    }


    notify(self, message, data) {
    }

    entryAction() {
        super.entryAction();
        let req = new Request();

        req.get('/exhibition', exhibitions => {
            console.log(exhibitions);
            this.render(exhibitions);
        }, error => {
            console.log(error);
        })
    }


}