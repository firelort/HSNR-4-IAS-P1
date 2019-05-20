class Sidebar extends View {

    constructor(elementSelector, templatePath) {
        super(elementSelector, templatePath);

        this.addEventListener('change', '#role', (e) => {
            eventService.publish('user.changed', e.target.options[e.target.selectedIndex].value);
        });

    }

    notify(self, message, data) {
    }
}