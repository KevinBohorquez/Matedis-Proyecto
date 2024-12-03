import React, { useState } from "react";
import styled from "styled-components";
import Machine from "./Machine";
import InputCoin from "./inputCoins";

const Cabinet = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`;
const Main = styled.main`
position: relative;
z-index: 0;
font-family: sans-serif;
margin: 0;
padding: 0;
box-sizing: border-box;
background-color: #DFF2EB;
`;

function Home() {
    const [coin, setCoin] = useState(0);
    const onCoinChanged = (total) => {
    setCoin(total);
    };
    const onOk = (price) => {
    setCoin(coin - price);
    };
    return (
    <div>
        <Main>
            <Cabinet>
            <Machine coin={coin} onOk={onOk} />
            <InputCoin coin={coin} onCoinChanged={onCoinChanged} />
            </Cabinet>
        </Main>
    </div>
    );
}

export default Home;
