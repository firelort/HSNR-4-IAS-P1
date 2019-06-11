# coding: utf-8
import cherrypy

from .database import Database


class Reservation(object):
    exposed = True

    def __init__(self):
        self.database = Database()

    ''' 
    GET     /reservation/                  alle Hallen anfordern
    GET     /reservation/:hall-id          einzelne Halle gemäß :hall-id anfordern
    '''

    @cherrypy.tools.json_out()
    def GET(self, reservationID=None):
        if reservationID is None:
            return self.database.getReservations()
        else:
            reservation = self.database.getReservationByID(reservationID)
            if reservation is None:
                raise cherrypy.HTTPError(404, 'Die Reservierung wurde nicht gefunden.')
            else:
                return reservation

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def PUT(self):
        try:
            return {"entryid": self.database.editReservation(cherrypy.request.json)}
        except:
            raise cherrypy.HTTPError(400, 'Die Anfrage enthält nicht das korrekte Format')

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def POST(self):

        data = cherrypy.request.json
        return {"entryid": self.database.addReservation(data)}
        # try:
        #     return true
        # except:
        #     raise cherrypy.HTTPError(400, 'Die Anfrage enthält nicht das korrekte Format')
