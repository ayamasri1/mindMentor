async function sendMessage() {
	const input = document.getElementById('userInput');
	const chatBox = document.getElementById('chatBox');
	const userText = input.value.trim();

	if (!userText) return;

	appendMessage(userText, 'user');
	input.value = '';

	try {
		const res = await fetch('http://localhost:5000/chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user_id: 'user123', message: userText }),
		});

		const data = await res.json();
		appendMessage(data.response, 'bot');
	} catch (err) {
		appendMessage('Oops! Something went wrong. 💔', 'bot');
	}
}

function appendMessage(text, sender) {
	const chatBox = document.getElementById('chatBox');
	const messageEl = document.createElement('div');
	messageEl.classList.add('message', sender);

	const avatar = document.createElement('div');
	avatar.classList.add('avatar');
	avatar.textContent = sender === 'user' ? 'U' : 'S';

	const bubble = document.createElement('div');
	bubble.classList.add('bubble');
	bubble.textContent = text;

	messageEl.appendChild(sender === 'user' ? bubble : avatar);
	messageEl.appendChild(sender === 'user' ? avatar : bubble);

	chatBox.appendChild(messageEl);
	chatBox.scrollTop = chatBox.scrollHeight;
}
