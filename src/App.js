// src/App.js
import React from 'react';
import './App.css'; // スタイリングを適用する場合、適切なCSSファイルをインポートします
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="App">
      <main className="App-main">
        <ChatBot />
      </main>
    </div>
  );
}

export default App;
