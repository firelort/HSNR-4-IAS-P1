class View {

    constructor(elementSelector, templatePath) {
        this.elementSelector = elementSelector;
        this.templatePath = templatePath;
        this.listeners = [];
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

    handleEvents(event) {
        let lookUpNode = event.target;
        let selectorFound = false;
        let reachedViewNode = false;
        let viewNode = document.querySelector(this.elementSelector);
        if (this.listeners[event.type]) {
            while (!selectorFound && !reachedViewNode) {
                for (let selector in this.listeners[event.type]) {
                    let nodes = document.querySelectorAll(this.elementSelector + ' ' + selector);
                    if ([].indexOf.call(nodes, lookUpNode) >= 0) {
                        this.listeners[event.type][selector](event, lookUpNode);
                        selectorFound = true;
                    }
                }
                if (viewNode == lookUpNode) {
                    reachedViewNode = true;
                } else {
                    lookUpNode = lookUpNode.parentElement;

                }
            }


        }
    }

    addEventListener(event, selector, callable) {

        if (!this.listeners[event]) {
            this.listeners[event] = [];
            let element = document.querySelector(this.elementSelector);
            if (element != null) {
                element.addEventListener(event, this.handleEvents.bind(this));
            } else {
                console.warn('Konnte EventListener nicht anwenden!');
            }


        }

        this.listeners[event][selector] = callable;

    }

    entryAction() {
    };

    exitAction() {
    }

}