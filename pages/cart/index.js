import { useState, useEffect } from 'react';
import TopBar from '../../components/productSection/TopBar';
import styled from 'styled-components';
import { useProductContext } from '../../state/context/productContext';
import CartComponent from '../../components/cart/CartComponent';

const StyledCartPage = styled.div`
  padding: 0 10%;
  .mainCartSection {
    width: 100%;
    text-align: center;

    /************* */

    h2 {
      margin: 2rem;
    }

    .bordering {
      hr {
        border-top: 1px solid #004695;
      }
    }
    .titleUnderline {
      width: 30%;
      margin: auto;
    }
    .cartInfoSection {
      margin: 0 20%;
      .cartInfo {
        .infoSection {
          border-radius: 6px 6px 0 0;
          background-color: #004695;
          .columnTitle {
            margin: 0 7%;
            display: flex;
            justify-content: space-between;
            h4 {
              color: #dfe6ed;
              margin: 0;
              padding: 0.42rem 0;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
`;

const AddToCart = () => {
  const data = useProductContext();
  const [loading, setIsLoading] = useState(true);
  // console.log('data IN CART is ', data.cart);
  // const { id } = useProductContext();
  // console.log('cart data is ', id);

  useEffect(() => {
    setIsLoading(false);
    // console.log('CART.LENGTH is ', data.cart.length);
  }, []);

  return (
    <StyledCartPage>
      <div className="mainCartSection">
        <TopBar title="Cart Page" />
        <h2>Your Cart Items:</h2>
        <div className="cartInfoSection">
          <div className="cartInfo">
            <div className="infoSection">
              <div className="columnTitle">
                <h4>Item</h4>
                <h4>Price</h4>
                <h4>Quantity</h4>
                <h4>Subtotal</h4>
              </div>
            </div>
          </div>
          {!loading && data.cart.length ? (
            data.cart.map(item => {
              console.log('item from cart is', item);
              return (
                <div key={item.id}>
                  <CartComponent item={item} />
                </div>
              );
            })
          ) : (
            <div>
              <h3 style={{ color: '#4d71cb' }}>Your Cart is Empty</h3>
            </div>
          )}
          <div className="bordering">
            <hr />
          </div>
          <div className="total">
            <p>Total amount: $xxxx</p>
          </div>
        </div>
      </div>
    </StyledCartPage>
  );
};

export default AddToCart;
