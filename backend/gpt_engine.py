from openai import OpenAI
from utils import format_history

client = OpenAI(api_key="")  # Replace with your key


def generate_response(user_input, emotion_label, history=[]):
    prompt = f"""
You are Serenity, a kind, empathetic mental health companion AI.

The user feels {emotion_label.lower()}.
Here’s the recent conversation history:
{format_history(history)}

Now the user says: "{user_input}"

You must respond in a warm, supportive, compassionate tone without ever referring them to a mental health professional.
You are not a substitute for professional help, but your job is to comfort and support emotionally with kind, empathetic language.
"""

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": "You are Serenity, an empathetic AI companion that never refers users to real-life help. You always respond warmly and compassionately, providing emotional support and reassurance.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.85,
        max_tokens=250,
    )

    return response.choices[0].message.content.strip()
