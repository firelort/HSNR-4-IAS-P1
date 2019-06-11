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

            let data = {};
            data.exhibitions = exhibitions;
            if (app.userID != User.GUEST) {
                req.get('/reservation', reservations => {
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
            } else {
                this.render(data);
            }

        }, error => {
            console.log(error);
        })
    }


}