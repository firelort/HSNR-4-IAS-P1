# coding: utf-8
import cherrypy

from .database import Database


class Search(object):
    exposed = True

    def __init__(self):
        self.database = Database()

    ''' 
    GET     /search/:query          Ergebnisse anhand von :query finden
    '''

    @cherrypy.tools.json_out()
    def GET(self, query):
        return self.database.search(query)
