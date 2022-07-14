import Link from 'next/link';
import styled from 'styled-components';

const StyledTotal = styled.div`
  margin: 1.5rem 0 3rem 0;
  display: flex;
  justify-content: center;
  .totalWrapper {
    width: 18rem;
    .cardWrapper {
      border: 1px solid #7c90a6;
      border-radius: 5px;
      background-color: #d1dfed;
      .spacing {
        margin: 0 10%;

        p {
          margin: 0.2rem 0;
        }

        hr {
          border-top: 1px solid #7c90a6;
          margin-bottom: 0;
        }
        .subtotal {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
        }
        .shipping {
          display: flex;
          justify-content: space-between;
        }
        .total {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .proceed {
      margin-top: 0.5rem;
      display: flex;
      button {
        flex-grow: 1;
      }
    }
  }
`;

function insertDecimal(num) {
  return (num / 100).toFixed(2);
}

const CartTotal = ({ total, shipping }) => {
  const finalPrice = insertDecimal(total * 100 + shipping * 100);

  return (
    <StyledTotal>
      <div className="totalWrapper">
        <div className="cardWrapper">
          <div className="spacing">
            <div className="subtotal">
              <p>Subtotal:</p>
              <p>${total}</p>
            </div>

            <div className="shipping">
              <p>Shipping Fee:</p>
              <p>${shipping}</p>
            </div>

            <hr />

            <div className="total">
              <h3>Order Total:</h3>
              <h3>${finalPrice}</h3>
            </div>
          </div>
        </div>
        <div className="checkoutBTN">
          <div className="btn proceed">
            <Link href={'/checkout'}>
              <button>Proceed to checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </StyledTotal>
  );
};

export default CartTotal;
