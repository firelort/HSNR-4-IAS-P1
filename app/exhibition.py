# coding: utf-8
import cherrypy

from .database import Database


class Exhibition(object):
    exposed = True

    def __init__(self):
        self.database = Database()

    ''' 
    GET     /exhibition/                        alle Messen anfordern
    GET     /exhibition/:exhibition-id          einzelne Messe gemäß :exhibition-id anfordern
    '''

    @cherrypy.tools.json_out()
    def GET(self, exhibitionID=None):
        if exhibitionID is None:
            return self.database.getExhibitions()
        else:
            exhibition = self.database.getExhibitionByID(exhibitionID)
            if exhibition is None:
                raise cherrypy.HTTPError(404, 'Die Messe wurde nicht gefunden.')
            else:
                return exhibition
