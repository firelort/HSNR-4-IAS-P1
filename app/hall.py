# coding: utf-8
import cherrypy

from .database import Database


class Hall(object):
    exposed = True

    def __init__(self):
        self.database = Database()

    ''' 
    GET     /hall/                  alle Hallen anfordern
    GET     /hall/:hall-id          einzelne Halle gemäß :hall-id anfordern
    '''

    @cherrypy.tools.json_out()
    def GET(self, hallID=None):
        if hallID is None:
            return self.database.getHalls()
        else:
            hall = self.database.getHallByID(hallID)
            if hall is None:
                raise cherrypy.HTTPError(404, 'Die Halle wurde nicht gefunden.')
            else:
                return hall
