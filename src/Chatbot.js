import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #333;  /* Fondo gris oscuro */
`;

const ChatbotContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    height: 400px;
    background-color: #444;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

const InnerBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #e0e0e0;
    width: 90%;
    height: 80%;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ChatHistory = styled.div`
    width: 100%;
    height: 70%;
    overflow-y: scroll;
    padding-right: 10px;
    margin-bottom: 10px;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
`;

const Input = styled.input`
    width: 80%;
    padding: 12px 20px;
    border: 2px solid #ccc;
    border-radius: 25px;
    font-size: 16px;
    background-color: #fff;
    color: #333;
    transition: border 0.3s, background-color 0.3s;

    &:focus {
        border-color: #0084ff;
        background-color: #f1f1f1;
        outline: none;
    }

    &::placeholder {
        color: #999;
    }
`;

const Button = styled.button`
    width: 15%;
    padding: 12px;
    border: none;
    background-color: #0084ff;
    color: white;
    font-size: 16px;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
        background-color: #005bb5;
    }

    &:active {
        transform: scale(0.98);
    }
`;

function Chatbot() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = async () => {
    if (!message) return;

    const newChatHistory = [...chatHistory, { sender: 'Usuario', message }];
    setChatHistory(newChatHistory);
    setMessage('');

    try {
      const response = await axios.post(`https://pruebamatedis.up.railway.app/api/about`, {
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
    <Main>
      <ChatbotContainer>
        <InnerBox>
          <ChatHistory>
            {chatHistory.map((chat, index) => (
              <div key={index}>
                <strong>{chat.sender}:</strong> {chat.message}
              </div>
            ))}
          </ChatHistory>
          <InputContainer>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe un mensaje"
            />
            <Button onClick={handleSendMessage}>Enviar</Button>
          </InputContainer>
        </InnerBox>
      </ChatbotContainer>
    </Main>
    
  );
}

export default Chatbot;