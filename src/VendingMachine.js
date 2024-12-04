import React, { useState } from "react";
import styled from "styled-components";
import { products } from "./data";
import TitleMachine from "./TitleMachine.jsx";
import SlotItem from "./SlotItem.js"


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 20px;
    background-color: #DFF2EB;
`;

const ProductContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const CoinContainer = styled.div`
    display: flex;
    margin-top: 20px;
`;

const CoinButton = styled.button`
    margin: 0 10px;
    padding: 10px;
    background-color: ${props => props.disabled ? '#cccccc' : '#4CAF50'};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const StatusMessage = styled.div`
    margin-top: 20px;
    font-weight: bold;
`;

const MachineContainer = styled.div`
    background-color: #22177A;
    border: 2px solid BLACK;
    width: 358px;
    margin-top: 30px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 70px;
`
const MachineSubContainer = styled.div`
    padding: 3px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #605EA1;
    padding-bottom: 10px;
`;  

function VendingMachine() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [insertedCoins, setInsertedCoins] = useState(0);
    const [status, setStatus] = useState('Selecciona un producto');

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setInsertedCoins(0);
        setStatus(`Seleccionado ${product.name}. Precio: ${product.price}. Inserte monedas.`);
    };

    const handleCoinInsert = (coin) => {
        if (!selectedProduct) {
            setStatus('Selecciona un producto primero');
            return;
        }

        const newTotal = insertedCoins + coin;
        setInsertedCoins(newTotal);

        if (newTotal >= selectedProduct.price) {
            const change = newTotal - selectedProduct.price;
            setStatus(`Toma tu ${selectedProduct.name}. Tu vuelto es: ${change}`);
            setSelectedProduct(null);
            setInsertedCoins(0);
        } else {
            setStatus(`Insertado: ${newTotal}. Falta: ${selectedProduct.price - newTotal}`);
        }
    };

    return (
        <Container>
            <MachineContainer>
                <TitleMachine/>
                <MachineSubContainer>
                    <ProductContainer>
                        {products.map((product) => (
                            <SlotItem
                                key={product.id}
                                product={product}
                                selectedProduct={selectedProduct}
                                onSelect={handleProductSelect}
                            />
                        ))}
                    </ProductContainer>
                </MachineSubContainer>
            </MachineContainer>

            {selectedProduct && (
                <CoinContainer>
                    {[1, 2, 5, 10].map((coin) => (
                        <CoinButton 
                            key={coin}
                            onClick={() => handleCoinInsert(coin)}
                        >
                            Insertar {coin}
                        </CoinButton>
                    ))}
                </CoinContainer>
            )}

            <StatusMessage>{status}</StatusMessage>
            {selectedProduct && (
                <div>Saldo actual: {insertedCoins}</div>
            )}
        </Container>
    );
}

export default VendingMachine;