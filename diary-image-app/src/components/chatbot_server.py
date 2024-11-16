from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize your model/pipeline
chatbot = pipeline("text-generation", model="gpt2")

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message', '')
    response = chatbot(user_input, max_length=100, num_return_sequences=1)
    reply = response[0]['generated_text']
    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
