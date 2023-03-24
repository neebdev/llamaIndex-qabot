from llama_index import GPTSimpleVectorIndex
import os
import json

with open('config.json', 'r') as f:
        config = json.load(f)

os.environ["OPENAI_API_KEY"] = config['api_key']


index = GPTSimpleVectorIndex.load_from_disk("indices/adgm_index.json")

while True:
    query = input("Enter your query (type 'exit' to quit): ")
    if query == 'exit':
        break
    response = index.query(query)
    print(response)