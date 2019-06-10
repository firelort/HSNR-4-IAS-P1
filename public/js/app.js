class Application extends View {

    constructor() {
        super();
        this.elementSelector = 'body';
        // Registrieren zum Empfang von Nachrichten
        eventService.subscribe(this, "templates.loaded");
        eventService.subscribe(this, "templates.failed");
        eventService.subscribe(this, "app.cmd");
        eventService.subscribe(this, "app.load");
        this.userID = User.GUEST;
        this.sidebar = new Sidebar(".sidebar-body", "layout/sidebar");
        // this.content = new Content('.content-body', 'layout/content');
        // this.content = new ExhibitionList('.content-body', 'lists/exhibitions');
        this.content = new ExhibitionList('.content-body', 'exhibitions/hallReservation');


    }

    /**
     *
     * @param self Application
     * @param message String
     * @param data mixed
     */
    notify(self, message, data) {
        /**
         * from state.exit
         * transition.actions
         * set state = tostate
         * tostate.entry
         *
         */

        console.log(data);
        switch (message) {
            case "templates.failed":
                alert("Vorlagen konnten nicht geladen werden.");
                break;
            case "templates.loaded":
                let nav = [
                    ["Messen"]
                ];
                self.sidebar.render(nav, '.sidebar-nav');
                self.content.render(['ab', 'cd']);

                let hd = new HallDesigner(document.getElementById('halls'));
                break;

            case 'app.load': {

                self.content.exitAction();

                switch (data.module) {
                    case 'exhibitionList':
                        console.log('exo');
                        break;

                    case 'exhibition':
                        self.content = new ExhibitionDetail('.content-body', 'details/exhibition');
                        self.content.setExhibitionID(data.id);
                        break;
                    case 'hall':
                        self.content = new HallDetail('.content-body', 'details/hall');
                        self.content.setHallID(data.id);
                        break;
                    case "indexUser":
                        switch (parseInt(data.type)) {
                            case User.EXHIBITOR:
                                self.content = new ExhibitionList('.content-body', 'lists/indexExhibitor');
                                break;
                            case User.ORGANIZER:
                                self.content = new ExhibitionList('.content-body', 'lists/indexOrganizer');
                                break;
                            case User.GUEST:
                                self.content = new ExhibitionList('.content-body', 'lists/indexGuest');
                                break;

                        }

                        this.userID = parseInt(data.type);

                        //self.content.render();
                        break;
                }


                self.content.entryAction();


            }
        }
    }
}