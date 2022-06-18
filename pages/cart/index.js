import TopBar from '../../components/productSection/TopBar';
import styled from 'styled-components';

const StyledCartPage = styled.div`
  padding: 0 10%;
  .mainCartSection {
    width: 100%;
    text-align: center;
  }
`;

const AddToCart = () => {
  return (
    <StyledCartPage>
      <div className="mainCartSection">
        <TopBar title="Cart Page" />
        <h3>This Is The Cart Page</h3>
      </div>
    </StyledCartPage>
  );
};

export default AddToCart;
