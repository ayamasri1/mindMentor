// chatbot.js
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatResponse = document.getElementById('chatResponse');

sendBtn.addEventListener('click', async () => {
  const message = userInput.value.trim();
  if (!message) return;

  chatResponse.textContent = 'Loading...';

  try {
    const res = await fetch('http://localhost:3000/chat', {  // Change localhost to your backend URL if deployed
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    if (data.reply) {
      chatResponse.textContent = data.reply;
    } else {
      chatResponse.textContent = 'No response from chatbot.';
    }
  } catch (err) {
    chatResponse.textContent = 'Error connecting to chatbot.';
  }
});