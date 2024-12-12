import React from "react";
import styled from "styled-components";

const TitleContainer = styled.div`
background-color: #d7fcf7;
margin-bottom: 15px;
border: 1px solid black;
display: flex;
justify-content: center;
align-items: center;

h7 {
    font-family: serif;
    font-size: 3.2rem;
    text-transform: uppercase;
    text-align: center;
    background: #FFFFFF;
    background: linear-gradient(to left, #FFFFFF 0%, #FF0000 100%);
    background-size: 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 0.6px black;
    animation: animate-gradient 2s linear infinite;

    @keyframes animate-gradient {
    to {
        background-position: 200%;
        }
    }
}
`;

function TitleMachine() {
    return (
    <TitleContainer>
        <h6>Fisi Express</h6>
    </TitleContainer>
    );
}

export default TitleMachine;
