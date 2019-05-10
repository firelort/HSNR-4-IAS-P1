class View {

    constructor(elementSelector, templatePath) {
        this.elementSelector = elementSelector;
        this.templatePath = templatePath;
    }

    render(data, elementSelector, templatePath) {
        let selector = elementSelector || this.elementSelector;
        let tpl = templatePath || this.templatePath
        let markup = templateManager.execute(tpl, data);
        let element = document.querySelector(selector);
        if (element != null) {
            element.innerHTML = markup;
        } else {
            console.warn(this.constructor.name + ': element ' + this.elementSelector + ' nicht gefunden')
            ;
        }
    }

    notify_px(self, message, data) {

        if (typeof this.notify === 'function') {
            this.notify(self, message, data);
        } else {
            console.log(this.constructor.name + ' hat keine notify-Funktion');
        }
    }
}