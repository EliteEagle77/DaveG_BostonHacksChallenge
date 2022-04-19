from flask import Flask, send_from_directory, json, request, Response
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

# writing to the mini database
def writeMini(path, data):
    miniDB = open(path, 'w')
    json.dump(data, miniDB)

#reading the mini database
def readMini(path):
    miniDB = open(path) 
    return json.load(miniDB)

@app.route("/")
def index():
    return send_from_directory(app.static_folder,'index.html')

@app.route('/returnlist', methods=['GET'])
def get_everything():
    path = "/Users/daveg/Desktop/Computer Science/BostonHacks/DaveG_BostonHacksChallenge/miniDatabase.json"
    existing_json = readMini(path)
    return json.dumps(existing_json)

@app.route('/addtolist', methods=['POST'])
def add_item():

    #get the json post data
    path = "/Users/daveg/Desktop/Computer Science/BostonHacks/DaveG_BostonHacksChallenge/miniDatabase.json"
    request_data = request.get_json()
    request_status = request_data['status']
    request_name = request_data['name']

    #add it to the json file
    currentValue = readMini(path)
    newItem = {'name': request_name, 'status': request_status}
    currentValue.append(newItem)
    writeMini(path, currentValue)
    return {request_name: "ADDED"}

@app.route('/deleteitem', methods=['POST'])
def remove_item():
    path = "/Users/daveg/Desktop/Computer Science/BostonHacks/DaveG_BostonHacksChallenge/miniDatabase.json"
    currentValue = readMini(path)
    request_data = request.get_json()
    request_name = request_data['name']

    #remove the key      
    updatedValue = [todo for todo in currentValue if not (todo['name'] == request_name)]    
    writeMini(path, updatedValue)

    return {request_name: "DELETED"}

