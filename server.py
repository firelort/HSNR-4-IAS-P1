# coding:utf-8


import json
import os.path
import sys

import cherrypy

from app import templates, exhibition, hall, exhibitionHall, reservation, search


def errorJsonResponse(traceback=None, message=None, status=None, version=None):
    error = {}
    statusParts = status.split()
    error["code"] = statusParts[0]
    del statusParts[0]
    error["status"] = ' '.join(map(str, statusParts))
    error['message'] = message
    return json.dumps(error)


def main():
    # aktuelles Verzeichnis ermitteln, damit es in der Konfigurationsdatei als
    # Bezugspunkt verwendet werden kann
    try:  # aktuelles Verzeichnis als absoluter Pfad
        currentDir = os.path.dirname(os.path.abspath(__file__))
    except:
        currentDir = os.path.dirname(os.path.abspath(sys.executable))
    cherrypy.Application.currentDir = currentDir

    configFileName = os.path.join(currentDir, 'server.conf')  # im aktuellen Verzeichnis
    if os.path.exists(configFileName) == False:
        # Datei gibt es nicht
        configFileName = None

    # autoreload-Monitor hier abschalten
    # cherrypy.engine.autoreload.unsubscribe()

    cherrypy.config.update({'error_page.400': errorJsonResponse,
                            'error_page.404': errorJsonResponse,
                            'error_page.405': errorJsonResponse,
                            'error_page.415': errorJsonResponse,
                            # 'error_page.500': errorJsonResponse,
                            }
                           )

    cherrypy.config.update(configFileName)
    # 1. Eintrag: Standardverhalten, Berücksichtigung der Konfigurationsangaben im configFile
    cherrypy.tree.mount(
        None, '/', configFileName
    )

    # 2. Eintrag: Method-Dispatcher für die "Applikation" "templates" vereinbaren
    cherrypy.tree.mount(
        templates.Template(),
        '/templates',
        {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
    )

    cherrypy.tree.mount(
        exhibition.Exhibition(),
        '/exhibition',
        {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
    )
    cherrypy.tree.mount(
        hall.Hall(),
        '/hall',
        {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
    )

    cherrypy.tree.mount(
        hall.Hall(),
        '/hall',
        {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
    )

    cherrypy.tree.mount(
        exhibitionHall.ExhibitionHall(),
        '/exhibitionhall',
        {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
    )

    cherrypy.tree.mount(
        reservation.Reservation(),
        '/reservation',
        {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
    )

    cherrypy.tree.mount(
        search.Search(),
        '/search',
        {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
    )

    cherrypy.engine.start()
    cherrypy.engine.block()


if __name__ == '__main__':
    main()
