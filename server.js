const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = "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";

const requestBody = {
  model: "deepseek/r1:free",
  messages: [
    { role: "user", content: "Hello! How are you?" }
  ]
};

fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(requestBody)
})
  .then(response => response.json())
  .then(data => {
    console.log("Response:", data);
  })
  .catch(error => {
    console.error("Error:", error);
  });