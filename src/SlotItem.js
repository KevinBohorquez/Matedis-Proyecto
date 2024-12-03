import React from "react";
import styled from "styled-components";

const DivBox = styled.div`
  border: 1px solid black;
  height: 130px;
  width: 80px;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-top: 5px;
  background-color: #8EA3A6;
`;

const Img = styled.img`
  height: 60px;
  width: auto;
  margin: 4px auto;
`;

const DivName = styled.div`
  font-size: 0.8em;
  text-align: center;
`;
const DivPrice = styled.div`
  font-size: 0.8em;
  text-align: center;
`;

const DivStatus = styled.div`
  background-color: ${props =>
    props.available ? "limegreen" : "MIDNIGHTBLUE"};
  height: 20px;
  width: 80%;
  margin: auto;
  &:hover {
    cursor: ${props => (props.available ? "pointer" : "arrow")};
  }
`;

function SlotItem({ product, coin, onOk }) {
  const { productImage, name, price } = product;

  return (
    <DivBox>
      
      <Img src={productImage}/>
      <DivName>{name}</DivName>
      <DivPrice>{price}</DivPrice>
      <DivStatus
        onClick={() => {
          if (price > coin) return;
          onOk(price);
        }}
        available={name && coin >= price}
      />
    </DivBox>
  );
}
export default SlotItem;
