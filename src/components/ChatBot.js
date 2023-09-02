import React, { useState, useEffect, useRef } from 'react';

function ChatBot() {
  const API_URL = 'https://5ifs66yxa4.execute-api.ap-northeast-1.amazonaws.com/api/chat';

  // メッセージの状態を管理するための useState フック
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messageContainerRef = useRef(null);

  const sendMessageToBot = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputMessage }), // メッセージをJSON形式で送信
      });

      if (response.ok) {
        const data = await response.json();
        const botResponse = data.message; // APIからの応答を取得
        addMessage(botResponse, 'bot'); // ボットからの応答を追加
      } else {
        console.error('APIエラー:', response.statusText);
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  };

  const addMessage = (text, user) => {
    const newMessage = {
      text: text,
      user: user,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    addMessage(inputMessage, 'user');
    // APIに送信
    sendMessageToBot();
    setInputMessage('');
  };

  // 新しいメッセージが追加されたときに自動的にスクロール
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-bot">
      {/* メッセージ表示エリア */}
      <div
        className="message-container"
        ref={messageContainerRef} // メッセージ表示エリアへの参照を追加
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user === 'user' ? 'user' : 'bot'}`}
          >
            <span className="icon"><img class="icon" src="img/icon.png" alt=""></span>
            <span className="message-text">{message.text}</span>
            <span className="message-timestamp">{message.timestamp}</span>
          </div>
        ))}
      </div>
      {/* 入力エリア */}
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

