class Sidebar extends View {

    constructor(elementSelector, templatePath) {
        super(elementSelector, templatePath);

        this.addEventListener('change', '#role', (e) => {
            eventService.publish('user.changed', e.target.options[e.target.selectedIndex].value);
            eventService.publish('app.load', {
                module: 'indexUser',
                type: e.target.options[e.target.selectedIndex].value
            })
        });


        this.addEventListener('click', '#hallnav a', (e, target) => {
            eventService.publish('app.load', {module: 'hall', id: target.getAttribute('data-id')});
        });


        this.addEventListener('click', '#exhibitionsnav a', (e, target) => {
            eventService.publish('app.load', {module: 'exhibition', id: target.getAttribute('data-id')});
        });


        eventService.subscribe(this, 'halls.updated');
        eventService.subscribe(this, 'exhibitions.updated');

    }


    notify(self, message, data) {

        switch (message) {
            case 'halls.updated':
                let halls = [];
                let keys = Object.keys(data);
                for (let i = 0; i < keys.length; i++) {
                    halls.push(`<li><a href="#" data-id="${data[keys[i]].entryid}">${data[keys[i]].name}</a></li>`);
                }

                document.querySelector('#hallnav').innerHTML = halls.join('');
                break;
            case 'exhibitions.updated':

                let exhibitions = [];
                let keysE = Object.keys(data);
                for (let i = 0; i < keysE.length; i++) {
                    exhibitions.push(`<li><a href="#" data-id="${data[keysE[i]].entryid}">${data[keysE[i]].name}</a></li>`);
                }

                document.querySelector('#exhibitionsnav').innerHTML = exhibitions.join('');
                break;


        }

    }
}