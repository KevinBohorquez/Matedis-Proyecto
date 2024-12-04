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
        props.status === 'selected' ? 'yellow' : 
        props.status === 'available' ? 'limegreen' : 
        'MIDNIGHTBLUE'
    };   
    height: 20px;   
    width: 80%;   
    margin: auto;   
    &:hover {     
        cursor: ${props => (props.status !== 'unavailable' ? 'pointer' : 'default')};   
    } 
`;

function SlotItem({ product, selectedProduct, onSelect }) {
  const { id, name, price, productImage } = product;
  const getStatus = () => {
      if (!selectedProduct) return 'available';
      if (selectedProduct.id === id) return 'selected';
      return 'unavailable';
  }

  return (
      <DivBox>
          <Img src={productImage}/>
          <DivName>{name}</DivName>
          <DivPrice>{price}</DivPrice>
          <DivStatus
              onClick={() => onSelect(product)}
              status={getStatus()}
          />
      </DivBox>
  );
}

export default SlotItem