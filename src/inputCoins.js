import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 200px;
  height: 120px;
`;
const Item = styled.div`
  font-size: 1.5em;
  margin: 5px 15px 0 15px;
  padding: 5px;
  background-color: skyblue;
  color: DARKGREEN;
  width: 60px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const Total = styled.div`
  font-size: 1.5em;
  margin: 25px 15px 0 15px;
  padding: 5px;
  text-align: center;
  background-color: LIMEGREEN;
  color: white;
  width: 200px;
  &:hover {
    cursor: pointer;
  }
`;
const Cancel = styled.div`
  font-size: 1.3em;
  margin: 25px 15px 0 15px;
  padding: 5px;
  text-align: center;
  background-color: TOMATO;
  color: white;
  width: 200px;
  &:hover {
    cursor: pointer;
  }
`;
function InputCoin({ coin, onCoinChanged }) {
  const [total, setTotal] = useState(coin);

  useEffect(() => {
    setTotal(coin);
  }, [coin]);

  const onItemClick = value => {
    const newTotal = total + value;
    setTotal(newTotal);
    onCoinChanged(newTotal);
  };
  const onCancel = () => {
    const newTotal = 0;
    setTotal(newTotal);
    onCoinChanged(newTotal);
  };
  return (
    <Container>
      <Item onClick={() => onItemClick(1)}>1</Item>
      <Item onClick={() => onItemClick(2)}>2</Item>
      <Item onClick={() => onItemClick(5)}>5</Item>
      <Item onClick={() => onItemClick(10)}>10</Item>
      <Item onClick={() => onItemClick(20)}>20</Item>
      <Item onClick={() => onItemClick(50)}>50</Item>
      <Item onClick={() => onItemClick(100)}>100</Item>
      <Total>{total}</Total>
      <Cancel onClick={onCancel}>Limpiar</Cancel>
    </Container>
  );
}

export default InputCoin;
