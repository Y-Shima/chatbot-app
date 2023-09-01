import React, { useState, useEffect, useRef } from 'react';

function ChatBot() {
  // メッセージの状態を管理するための useState フック
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messageContainerRef = useRef(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      text: inputMessage,
      user: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    // 以前のメッセージを保持しつつ、新しいメッセージを追加
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');

    // ボットからのレスポンスを模擬する例（適切なレスポンスを実際に取得する必要があります）
    setTimeout(() => {
      const botResponse = {
        text: 'こんにちは！私はチャットボットです。',
        user: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
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

