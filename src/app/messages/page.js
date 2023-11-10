'use client'
import Image from 'next/image';
import './style.css';
import { useState } from 'react';


export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    // Implement the logic to send a message
    // Update the state with the new message
    setMessages([...messages, { text: inputText, sender: 'me' }]);
    setInputText('');
  };

  return (
    <div className="chat-app-container">
      <div className="profile-sidebar">
        {/* Add profile components here */}
        <div className="profile">Profile 1</div>
        <div className="profile">Profile 2</div>
        {/* Add more profile components as needed */}
      </div>
      <div className="chat-container">
        <div className="messages-container">
          {/* Display messages */}
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === 'me' ? 'my-message' : 'other-message'}`}>
              <div className="message-bubble">{message.text}</div>
            </div>
          ))}
        </div>
        <div className="message-input-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
