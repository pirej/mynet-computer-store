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
  const { testID } = useProductContext();
  console.log(' fetched cartID from context is ', testID);
  return (
    <StyledCartPage>
      <div className="mainCartSection">
        <TopBar title="Cart Page" />
        <h3>This Is The Cart Page</h3>
        {testID && <h3>Item with ID {testID} is in cart</h3>}
      </div>
    </StyledCartPage>
  );
};

export default AddToCart;
