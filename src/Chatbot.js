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
      setRandomNumber(data.random_number); // Guarda el número aleatorio
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Generador de Número Aleatorio</h1>
      <input
        type="text"
        placeholder="Escribe un mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Enviar mensaje</button>
      {randomNumber !== null && (
        <p>El número aleatorio generado es: {randomNumber}</p>
      )}
    </div>
  );
}

export default Chatbot;
