/**
 * Die Datei dient dazu Synonyme zu bieten und kleine Änderungen an den vorgebeben Dateien zu erstellen ohne diese
 * selbst zu ändern.
 */

class EventService extends APPUTIL.EventService_cl {

    constructor() {
        super();
    }

    subscribe(Subscriber_opl, Message_spl) {
        this.subscribe_px(Subscriber_opl, Message_spl);
    }

    unsubscribe(Subscriber_opl, Message_spl) {
        this.unSubscribe_px(Subscriber_opl, Message_spl);
    }

    publish(Message_spl, Data_opl) {
        this.publish_px(Message_spl, Data_opl);
    }

    defer(notifier_ppl, entry_opl, message_spl, data_opl) {
        this.defer_p(notifier_ppl, entry_opl, message_spl, data_opl)
    }

    each(object_opl, iterator) {
        this.each_p(object_opl, iterator);
    }

    findAll(object_opl, iterator) {
        this.findAll_p(object_opl, iterator);
    }

    compact(object_opl) {
        this.compact_p(object_opl);
    }

}

class TemplateManager extends APPUTIL.TemplateManager_cl {

    constructor() {
        super();
    }

    init() {
        this.init_px();
    }

    get(templatePath) {
        this.get_px(templatePath);
    }

    /**
     * Templates können über den Serverseiten Pfad angegeben werden, die Dateiendung wird automatisch angehängt (.html)
     * @param templatePath Pfad zum Template ohne Dateiendung
     * @param data Daten für das Template
     */
    execute(templatePath, data) {
        return this.execute_px(templatePath + '.html', data);
    }
}