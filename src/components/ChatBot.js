// src/components/ChatBot.js
import React, { useState } from 'react';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    const newMessage = {
      text: inputMessage,
      user: 'user', // ここでユーザーとボットを区別することができます
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    setInputMessage('');

    // ボットからのレスポンスを模擬する例（適切なレスポンスを実際に取得する必要があります）
    setTimeout(() => {
      const botResponse = {
        text: 'こんにちは！私はチャットボットです。',
        user: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, botResponse]);
    }, 1000);
  };

  return (
    <div className="chat-bot">
      <div className="message-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user === 'user' ? 'user' : 'bot'}`}
          >
            <span className="message-text">{message.text}</span>
            <span className="message-timestamp">{message.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="メッセージを入力..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>送信</button>
      </div>
    </div>
  );
}

export default ChatBot;

