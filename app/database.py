import json
import os

import cherrypy


class Database(object):

    def __init__(self):
        self.path_s = os.path.join(cherrypy.Application.currentDir, "data")

    # -------------------------------------------------------------------------

    def search(self, query):
        reservations = self.readJSONFile("reservations.json")
        filtered = {}
        for key, value in reservations.items():
            print(value)
            if (query.lower() in value['creator'].lower() and "accepted" in value and value['accepted']):
                filtered[key] = value
        return filtered

    # -------------------------------------------------------------------------



    def getExhibitions(self):
        return self.readJSONFile("exhibitions.json")

    def getExhibitionByID(self, exhibitionID):
        exhibitions = self.readJSONFile("exhibitions.json")
        return self.getEntryFromList(exhibitions, exhibitionID)

    def addExhibition(self, exhibition):
        newID = self.addEntry(exhibition, self.getExhibitions(), "exhibitions.json")
        return newID

    # -------------------------------------------------------------------------

    def getHalls(self):
        return self.readJSONFile("halls.json")

    def getHallByID(self, hallID):
        hall = self.readJSONFile("halls.json")
        return self.getEntryFromList(hall, hallID)

    def getHallByExhibitionID(self, exhibitionID):
        halls = self.readJSONFile("halls.json")
        filtered = {}
        for key, value in halls.items():
            if int(value['exhibitionID']) == int(exhibitionID):
                filtered[key] = value
        return filtered

    def addHall(self, hall):
        newID = self.addEntry(hall, self.getHalls(), "halls.json")
        return newID

    def editHall(self, hall):
        newID = self.editEntry(hall, self.getHalls(), "halls.json")
        return newID

        # -------------------------------------------------------------------------

    def getReservations(self):
        return self.readJSONFile("reservations.json")

    def getReservationByID(self, reservationID):
        reservation = self.readJSONFile("reservations.json")
        return self.getEntryFromList(reservation, reservationID)

    def getReservationByHallID(self, hallID):
        reservations = self.readJSONFile("reservations.json")
        filtered = {}
        for key, value in reservations.items():
            if int(value['hallID']) == int(hallID):
                filtered[key] = value
        return filtered

    def addReservation(self, reservation):

        print('lol')
        newID = self.addEntry(reservation, self.getReservations(), "reservations.json")
        return newID

    def editReservation(self, reservation):
        newID = self.editEntry(reservation, self.getReservations(), "reservations.json")
        return newID

    # -------------------------------------------------------------------------

    def addEntry(self, entry, entryList, filename):
        newId = self.getMaxId(entryList) + 1
        entry['entryid'] = newId
        entryList[newId] = entry
        self.writeJSONFile(filename, entryList)
        return newId

    def editEntry(self, entry, entryList, filename):
        entryList[entry['entryid']] = entry
        self.writeJSONFile(filename, entryList)
        return entry['entryid']

    def readJSONFile(self, filename):
        try:
            with open(os.path.join(self.path_s, filename)) as f:
                data = json.load(f)
                f.close()
        except FileNotFoundError:
            with open(os.path.join(self.path_s, filename), 'w') as f:
                f.write('{}')
                f.close()
                data = {}

        return data

    def writeJSONFile(self, filename, data):
        with open(os.path.join(self.path_s, filename), 'w') as f:
            f.write(json.dumps(data, indent=4, separators=(',', ': ')))
            f.close()

    def getEntryFromList(self, list, id):
        if self.isNumber(id):
            try:
                return list[str(id)]
            except KeyError:
                return None
        return None

    def getMaxId(self, list):

        maxId = 0

        for key in list:
            maxId = max(maxId, int(key))
        return maxId

    def isNumber(self, s):
        try:
            int(s)
            return True
        except ValueError:
            return False
