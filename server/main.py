from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'holasoyyo'
CORS(app, resources = {r"/*":{"origins":"*"}})

socket = SocketIO(app, cors_allowed_origins = "*")



if __name__ == '__main__':
    socket.run(app, debug=True, port=5000)