class SearchList extends View {

    constructor(elementSelector, templatePath) {
        super(elementSelector, templatePath);


        this.addEventListener('click', '.hall-row', (event, target) => {
            event.stopImmediatePropagation();
            eventService.publish('app.load', {module: 'hall', id: parseInt(target.getAttribute('data-id'))});
            //eventService.publish('user.changed', e.target.options[e.target.selectedIndex].value);
        });

    }


    notify(self, message, data) {
    }

    setQuery(query) {
        this.query = query;
    }

    entryAction() {
        super.entryAction();
        let req = new Request();
        let data = {};

        req.get('/search/' + this.query, reservations => {
            data.reservations = reservations;
            let ids = [];
            for (let res in reservations) {
                ids.push(reservations[res].hallID);
            }

            ids = [...new Set(ids)];
            let fetchArgs = [];
            ids.forEach(id => {
                fetchArgs.push({path: '/hall/' + id});
            });
            req.multi(fetchArgs, halls => {
                data.halls = halls;
                this.render(data);
            })

        });
    }


}