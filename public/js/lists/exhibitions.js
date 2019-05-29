class ExhibitionList extends View {

    constructor(elementSelector, templatePath) {
        super(elementSelector, templatePath);


        this.addEventListener('click', '.selectable-row', (event, target) => {
            target.classList.toggle('selected');
            //eventService.publish('user.changed', e.target.options[e.target.selectedIndex].value);
        });

    }

    notify(self, message, data) {
    }


}