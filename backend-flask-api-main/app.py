from flask import Flask, request, jsonify
from flask_cors import CORS
from llama_index import GPTSimpleVectorIndex
import os
import json

with open('config.json', 'r') as f:
    config = json.load(f)

os.environ["OPENAI_API_KEY"] = config['api_key']

app = Flask(__name__)
CORS(app)
index = None

@app.route('/initialize', methods=['POST'])
def initialize_index():
    global index
    index_data = request.get_json()
    index = GPTSimpleVectorIndex.load_from_disk(index_data['index_path'])
    return jsonify({"response": "Index initialized successfully!"})

@app.route('/query', methods=['POST'])
def query_index():
    query_data = request.get_json()
    query = query_data['query']
    response = index.query(query)
    return jsonify({"response" : response.response})

if __name__ == '__main__':
    app.run()