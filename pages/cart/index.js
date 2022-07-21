import { useState, useEffect } from 'react';
import TopBar from '../../components/productSection/TopBar';
import styled from 'styled-components';
import { useProductContext } from '../../state/context/productContext';
import CartComponent from '../../components/cart/CartComponent';
import Link from 'next/link';
import CartTotal from '../../components/cart/CartTotal';

const StyledCartPage = styled.div`
  padding: 0 10%;
  @media (max-width: 1440px) {
    padding: 0 5%;
  }

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
      @media (max-width: 1280px) {
        margin: 0 15%;
      }
      @media (max-width: 1024px) {
        margin: 0 10%;
      }
      @media (max-width: 768px) {
        margin: 0 5%;
      }
      @media (max-width: 590px) {
        margin: 0;
      }
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
      .buttons {
        margin-top: 0.5rem;
        display: flex;
        justify-content: space-between;
        gap: 5%;

        .btn {
          display: flex;
          justify-content: flex-end;

          button {
            background-color: #e05539;
          }

          button:hover {
            background-color: #ff6b4d;
          }
        }
        .link {
          display: flex;
          justify-content: flex-start;

          button {
            background-color: #19a695;
          }

          button:hover {
            background-color: #00bfa9;
          }
        }
      }
    }
  }
  .emptyCart {
    h2 {
      margin: 3rem 2rem;
      color: #e05539;
      font-size: 2rem;
    }
    .btn {
      button {
        font-size: 1.1rem;
        letter-spacing: 0.05rem;
      }
    }
  }
`;

const AddToCart = () => {
  const { cart, clearCart } = useProductContext();
  const [loading, setIsLoading] = useState(true);
  console.log('data IN CART is ', cart);
  // const { id } = useProductContext();
  // console.log('cart data is ', id);

  useEffect(() => {
    setIsLoading(false);
    // console.log('CART.LENGTH is ', cart.length);
  }, []);

  //--------------------------------------------
  let shipping = 5;
  const allItemsSubtotals = [];
  !loading &&
    cart.length &&
    cart.map(item => {
      // --------------------------------------------
      const subtotal = item.discount
        ? item.price * item.numItems -
          item.price * item.numItems * (item.discount / 100)
        : item.price * item.numItems;
      allItemsSubtotals.push(subtotal);
      // -------------------------------------------
    });

  const initialAmount = 0;
  const allSubtotals = allItemsSubtotals.reduce(
    (previousAmount, currentAmount) => previousAmount + currentAmount,
    initialAmount
  );
  const total = Math.round((allSubtotals + Number.EPSILON) * 100) / 100;
  total > 0 ? (shipping = 5) : (shipping = 0);
  //--------------------------------------------

  return (
    <StyledCartPage>
      <div className="mainCartSection">
        <TopBar title="Cart Page" />
        {!loading && cart.length ? (
          <div className="ifCart">
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
              {cart.map(item => {
                return (
                  <div key={item.id}>
                    <CartComponent item={item} />
                  </div>
                );
              })}
              <div className="bordering">
                <hr />
              </div>
              <div className="buttons">
                <div className="btn link">
                  <button>
                    <Link href="/">Continue Shopping</Link>
                  </button>
                </div>
                <div className="btn">
                  <button onClick={() => clearCart()}>Clear The Cart</button>
                </div>
              </div>
              <div className="total">
                <CartTotal total={total} shipping={shipping} />
              </div>
            </div>
          </div>
        ) : (
          <div className="emptyCart">
            <h2>Your Cart is Empty</h2>
            <div className="btn">
              <button>
                <Link href="/">Go Shopping</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </StyledCartPage>
  );
};

export default AddToCart;
