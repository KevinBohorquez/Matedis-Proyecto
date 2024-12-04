import React, { useState } from 'react'
import styled from 'styled-components'
import BurguerButton from './BurguerButton'
import { Link } from 'react-router-dom';


function Navbar() {

    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
    setClicked(!clicked)
    }
    return (
    <>
        <NavContainer>
        <h2>
            Matematicas Discretas <span>Proyecto</span>
        </h2>
        <div className={`links ${clicked ? "active" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/tiendas">Tiendas</Link>
            <Link to="/Chatbot">Chatbot</Link>
        </div>
        <div className="burguer">
            <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${clicked ? " active" : ""}`}></BgDiv>
    </NavContainer>
    </>
    )
}

export default Navbar

const NavContainer = styled.nav`
    z-index: 10;
    padding: 0;
    background-color: #4335A7 ;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: sans-serif;
h2{
    font-size: 1.4rem;
    color: white;
    font-weight: 400;
    span{
        font-weight: bold;
    }
    margin-left: 3rem;
}

a{
    color: white;
    text-decoration: none;
    margin-right: 4rem;
}

.links{
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease;
    &.active {
        position: absolute;
        top: 20%;
        left: 0;
        width: 100%;
        display: block;
        z-index: 11;
    }
    a{
        color: white;
        font-size: 2rem;
        display: block;
    }
    @media(min-width: 768px){
        position: initial;
        margin: 0;
        a{
            font-size: 1rem;
            color: white;
            display: inline;
        }
        display: block;
    }
}

.links.active{
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 10%;
    left: 0;
    right: 0;
    text-align: center;
    a{
        font-size: 2rem;
        margin-top: 1rem;
        color: white;
    }
}

.burguer{
    z-index: 11;
    @media(min-width: 768px){
        display: none;
    }
}
`

const BgDiv = styled.div`
    background-color: #4335A7;
    position: absolute;
    top: -1000px;
    left: -1000px;
    width: 100%;
    height: 100%;
    z-index: 5;
    transition: all .6s ease ;

&.active{
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 55%;
}
`