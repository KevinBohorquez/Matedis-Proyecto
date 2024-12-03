import React, { useState } from "react";
import styled from "styled-components";
import SlotItem from "./SlotItem.js";
import { products } from "./data";
import TitleMachine from "./TitleMachine.jsx";


const Container = styled.div`
  background-color: #22177A;
  border: 2px solid BLACK;
  width: 358px;
  margin-top: 30px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 70px;
`
const SubContainer = styled.div`
  padding: 3px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #605EA1;
  padding-bottom: 10px;
`;

function Machine({ coin, onOk }) {
  const [productList] = useState(products);
  return (
    <Container>
      <TitleMachine/>
      <SubContainer>
      {productList &&
        productList.map(p => {
          return <SlotItem key={p.id} product={p} coin={coin} onOk={onOk} />;
        })}
      </SubContainer>
    </Container>
  );
}
export default Machine;
