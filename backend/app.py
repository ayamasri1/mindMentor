import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
from emotion_model import detect_emotion
from gpt_engine import generate_response
from utils import detect_crisis

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

chat_history = {}


@app.route("/chat", methods=["POST"])
def chat():
    try:
        user_id = request.json.get("user_id")
        message = request.json.get("message")
        history = chat_history.get(user_id, [])

        emotion, score = detect_emotion(message)

        if detect_crisis(message):
            return jsonify(
                {
                    "response": "I'm really concerned. Please reach out to a mental health professional or call a local crisis line immediately. You're not alone. 💙",
                    "emotion": emotion,
                    "crisis": True,
                }
            )

        ai_response = generate_response(message, emotion, history)
        history.append((message, ai_response))
        chat_history[user_id] = history

        return jsonify({"response": ai_response, "emotion": emotion, "crisis": False})
    except Exception as e:
        print("🔥 Internal Server Error:", traceback.format_exc())
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
