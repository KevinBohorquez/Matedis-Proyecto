import React, { useState } from 'react';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);

  const sendMessage = async () => {
    try {
      const response = await fetch('https://pruebamatedis.up.railway.app/random-number', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error al comunicarse con la API');
      }
  
      const data = await response.json();
      setRandomNumber(data.random_number); // Guarda el número aleatorio en el estado
    } catch (error) {
      console.error('Error:', error);
    }
  };  
}

export default Chatbot;
