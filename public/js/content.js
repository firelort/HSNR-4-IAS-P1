class Content extends View {
    constructor(elementSelector, templatePath) {
        super(elementSelector, templatePath);

        eventService.subscribe(this, 'user.changed');
    }


    notify(self, message, data) {
        let elem = document.querySelector(this.elementSelector);
        switch (message) {
            case 'user.changed':
                elem.innerHTML = message + data;
                break;
        }

    }
}