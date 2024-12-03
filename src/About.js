import React, { useState } from 'react';
import axios from 'axios';

function About() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = async () => {
    if (!message) return;

    const newChatHistory = [...chatHistory, { sender: 'Usuario', message }];
    setChatHistory(newChatHistory);
    setMessage('');

    try {
        const response = await axios.post('https://matedisproyectorhamses.up.railway.app/chat', {
        message: message  
        });

        const botResponse = response.data.response || 'No pude entender eso.';
        setChatHistory([...newChatHistory, { sender: 'Chatbot', message: botResponse }]);
    } catch (error) {
        console.error('Error al comunicarse con el servidor:', error);
        setChatHistory([...newChatHistory, { sender: 'Chatbot', message: 'Hubo un error en el servidor.' }]);
    }
  };

  return (
    <div>
      <div>
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <strong>{chat.sender}:</strong> {chat.message}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje"
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default About;
