class Application extends View {

    constructor() {
        super();
        // Registrieren zum Empfang von Nachrichten
        eventService.subscribe(this, "templates.loaded");
        eventService.subscribe(this, "templates.failed");
        eventService.subscribe(this, "app.cmd");
        this.sidebar = new Sidebar(".sidebar-body", "layout/sidebar");
        //this.content = new Content('content-body');

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
                break;
        }
    }
}