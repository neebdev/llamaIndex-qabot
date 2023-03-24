import os
import json
from llama_index import Document, LLMPredictor, GPTTreeIndex, GPTSimpleVectorIndex, GPTListIndex
from llama_index.indices.knowledge_graph.base import GPTKnowledgeGraphIndex
from llama_index.composability import ComposableGraph
from langchain import OpenAI

with open('config.json', 'r') as f:
        config = json.load(f)

os.environ["OPENAI_API_KEY"] = config['api_key']

llm_predictor = LLMPredictor(llm=OpenAI(temperature=0, model_name="text-davinci-003"))

if not os.path.exists("indices"):
    os.mkdir("indices")

'''
for filename in os.listdir("data/"):
    if filename.endswith(".txt"):
        with open(os.path.join("data/", filename), "r", encoding="utf-8") as f:
            text = f.read()
            document = [Document(text)]
            index = GPTKnowledgeGraphIndex(
                document, 
                chunk_size_limit=512, 
                max_triplets_per_chunk=2,
                llm_predictor=llm_predictor,
                include_embeddings=True)
            index_filename = os.path.splitext(filename)[0] + f"_index_kg.json"
            index.save_to_disk(os.path.join("indices", index_filename))
'''
indices = []
for filename in os.listdir("indices/"):
     if filename.endswith("kg.json"):
        index = GPTKnowledgeGraphIndex.load_from_disk(os.path.join("indices", filename))
        summary = index.query("What is the summary of this document?", response_mode="tree_summarize")
        index.set_text(str(summary))
        index.set_doc_id(os.path.splitext(filename)[0])
        indices.append(index)

tree_index = GPTListIndex(indices)
graph = ComposableGraph.build_from_index(tree_index)
graph.save_to_disk("index_graph_kg_list.json")

               
