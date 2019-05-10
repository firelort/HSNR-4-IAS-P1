import json
import os

import cherrypy

class Database(object):

    def __init__(self):
        self.path_s = os.path.join(cherrypy.Application.currentDir, "data")

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
