import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>المحادثة</h2>
      <div style={{ height: '300px', border: '1px solid #ccc', overflowY: 'scroll', marginBottom: '10px', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <p style={{ background: '#f1f1f1', padding: '5px', borderRadius: '5px', display: 'inline-block' }}>{msg.text}</p>
          </div>
        ))}
      </div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="اكتب رسالتك..." 
      />
      <button onClick={sendMessage}>إرسال</button>
    </div>
  );
};

export default Chat;
