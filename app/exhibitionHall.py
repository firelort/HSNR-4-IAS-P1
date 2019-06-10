# coding: utf-8
import cherrypy

from .database import Database


class ExhibitionHall(object):
    exposed = True

    def __init__(self):
        self.database = Database()

    ''' 
    GET     /hall/:hall-id          einzelne Halle gemäß :hall-id anfordern
    '''

    @cherrypy.tools.json_out()
    def GET(self, exhibitionID):
        halls = self.database.getHallByExhibitionID(exhibitionID)
        if halls is None:
            raise cherrypy.HTTPError(404, 'Die Hallen wurden nicht gefunden.')
        else:
            return halls
