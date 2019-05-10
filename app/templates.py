# coding: utf-8

import codecs
import json
import os
import os.path

import cherrypy

# Method-Dispatching!

# Übersicht Anforderungen / Methoden
# (beachte: / relativ zu /templates, siehe Konfiguration Server!)

"""

Anforderung       GET          PUT          POST          DELETE
----------------------------------------------------------------
/                 Alle         -            -             -
                  Templates
                  liefern

"""


# ----------------------------------------------------------
class Template(object):
    # ----------------------------------------------------------

    exposed = True  # gilt für alle Methoden

    # -------------------------------------------------------
    def __init__(self):
        # -------------------------------------------------------
        pass

    # -------------------------------------------------------
    def GET(self):
        # -------------------------------------------------------
        self.returnValue = {
            'templates': {}
        }

        self.path = os.path.join(cherrypy.Application.currentDir, 'templates')
        self.readDir(self.path)

        return json.dumps(self.returnValue)

    def readDir(self, path):
        files = os.listdir(path)
        for filename in files:
            file = os.path.join(path, filename)
            if os.path.isdir(file):
                self.readDir(file)
            else:
                relativePath = os.path.join(path, filename)[len(self.path) + 1:]  # Template root vom Namen entfernen
                fileHandler = codecs.open(file, 'rU',
                                     'utf-8')
                fileContent = fileHandler.read()
                fileHandler.close()
                key = relativePath.replace("\\", "/")  # Pfade vereinheitlichen
                self.returnValue["templates"][key] = fileContent

# EOF
