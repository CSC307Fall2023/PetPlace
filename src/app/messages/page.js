'use client'
import React, { useEffect, useState } from 'react';
import './style.css';

const chatrooms = [
  {
    id: 1,
    name: 'General',
    messages: [
      { sender: 'MrMod', content: 'Reminder to keep memes out of #general' },
      { sender: 'morbo', content: 'you cant stop me' },
    ],
  },
  {
    id: 2,
    name: 'CatLovers',
    messages: [
      { sender: 'Orangeball', content: 'Anyone here?' },
      { sender: 'Cheshire', content: 'Plotting the demise of DogLovers' },
    ],
  },
  // Add more chatrooms as needed
  {
    id: 3,
    name: 'Stickbug',
    messages: [
      { sender: 'Buford', content: 'stickbug' },
      { sender: 'morbo', content: 'stickbug' },
      { sender: 'beanboy', content: 'why was I added to this chat' },
    ],
  },
];

export default function Messages() {
  const [currentChatroom, setCurrentChatroom] = useState(chatrooms[0]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Check if the code is running on the client
    if (typeof window !== 'undefined') {
      // Define client-specific logic here
    }
  }, []);

  const handleChatroomSwitch = (chatroom) => {
    setCurrentChatroom(chatroom);
  };

  const handleSendMessage = () => {
    // Simulate sending a message
    const updatedMessages = [...currentChatroom.messages, { sender: 'User', content: newMessage }];
    setCurrentChatroom({ ...currentChatroom, messages: updatedMessages });

    // Reset the new message input
    setNewMessage('');
  };

  return (
    <div className="messages-container">
      {/* Chatrooms Panel */}
      <div className="chatrooms-panel">
        <div className="chatroom-switcher">
          {chatrooms.map((chatroom) => (
            <div
              key={chatroom.id}
              className={`chatroom-circle ${chatroom.id === currentChatroom.id ? 'active' : ''}`}
              onClick={() => handleChatroomSwitch(chatroom)}
            />
          ))}
        </div>
        <ul className="chatroom-list">
          {chatrooms.map((chatroom) => (
            <li
              key={chatroom.id}
              className={`chatroom-item ${chatroom.id === currentChatroom.id ? 'active' : ''}`}
              onClick={() => handleChatroomSwitch(chatroom)}
            >
              <p className="chatroom-name">{chatroom.name}</p>
              <p className="last-message">{chatroom.messages.length > 0 ? chatroom.messages.slice(-1)[0].content : ''}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Current Chatroom */}
      <div className="chatroom">
        <div className="chatroom-header">
          <h1 className="chatroom-title">{currentChatroom.name}</h1>
        </div>
        <div className="chatroom-messages">
          {currentChatroom.messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === 'User' ? 'my-message' : 'other-message'}`}>
              <p className="message-sender">{message.sender}</p>
              <p className="message-content">{message.content}</p>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            className="input-box"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}