import TopBar from '../../components/productSection/TopBar';
import styled from 'styled-components';
import { useProductContext } from '../../state/context/productContext';

const StyledCartPage = styled.div`
  padding: 0 10%;
  .mainCartSection {
    width: 100%;
    text-align: center;
  }
`;

const AddToCart = () => {
  const data = useProductContext();
  console.log('cart data is ', data);
  //----------------
  return (
    <StyledCartPage>
      <div className="mainCartSection">
        <TopBar title="Cart Page" />
        {data.cart.length ? (
          <div>
            <h2>Your cart items:</h2>
            <h3 style={{ color: '#19A695' }}>{data.cart[0].title}</h3>
            <h3 style={{ color: '#19A695' }}>Stock: {data.cart[0].stock}</h3>
          </div>
        ) : (
          <div>
            <h2 style={{ color: '#E05539' }}>Your Cart is Empty</h2>
          </div>
        )}
      </div>
    </StyledCartPage>
  );
};

export default AddToCart;
