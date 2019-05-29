class Application extends View {

    constructor() {
        super();
        // Registrieren zum Empfang von Nachrichten
        eventService.subscribe(this, "templates.loaded");
        eventService.subscribe(this, "templates.failed");
        eventService.subscribe(this, "app.cmd");
        eventService.subscribe(this, "app.load");
        this.sidebar = new Sidebar(".sidebar-body", "layout/sidebar");
        // this.content = new Content('.content-body', 'layout/content');
        this.content = new ExhibitionList('.content-body', 'lists/exhibitions');


    }

    notify(self, message, data) {
        switch (message) {
            case "templates.failed":
                alert("Vorlagen konnten nicht geladen werden.");
                break;
            case "templates.loaded":
                let nav = [
                    ["Messen"]
                ];
                self.sidebar.render(nav, '.sidebar-nav');
                this.content.render(['ab', 'cd']);
                break;

            case 'app.load': {

                self.content.exitAction();

                switch (data.module) {
                    case 'exhibitionList':
                        console.log('exo');
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

                        self.content.render();
                        break;
                }


                self.content.entryAction();


            }
        }
    }
}