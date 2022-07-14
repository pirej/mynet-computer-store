import { useState, useEffect } from 'react';
import PaypalCheckoutButton from '../components/Cart/PaypalCheckoutButton';
import { useProductContext } from '../state/context/productContext';
import styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

const StyledChekout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;

  .blueBar {
    background-color: #004695;
    width: 30vw;
    min-width: 28rem;
    text-align: center;
    border-radius: 6px 6px 0 0;
    h3 {
      color: #e9edf2;
      margin: 0;
      padding: 0.42rem 0;
    }
  }

  h3 {
    color: #19a695;
  }

  .paypal-button-container {
    width: 30vw;
    min-width: 28rem;
  }

  .testInfo {
    background-color: #d1dfed;
    border: 1px solid #7c90a6;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0 1rem 0;
    h4 {
      margin: 0.2rem;
    }
  }
`;

function insertDecimal(num) {
  return (num / 100).toFixed(2);
}

const Checkout = () => {
  const { cart } = useProductContext();
  const [loading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  let activeUser;
  if (user) {
    activeUser = user.nickname;
    if (!user.email_verified) {
      router.push('/');
    }
  }

  let shipping = 5;
  const allItemsSubtotals = [];
  useEffect(() => {
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
    const finalAmount = total + shipping;
    setAmount(finalAmount.toFixed(2));
    // eslint-disable-next-line
  }, [loading]);
  // -------------------------------------------------------------------------
  return (
    <StyledChekout>
      <div className="blueBar">
        <h3>Hello {activeUser}</h3>
      </div>
      <h3>Your cart total is ${amount}</h3>
      <div className="paypal-button-container">
        {amount && amount > 5 && <PaypalCheckoutButton cartAmount={amount} />}
      </div>
      <div className="testInfo">
        <h4>Test Card info:</h4>
        <h4>card number: 4032038761223662</h4>
        <h4>card valid thru: 11/26</h4>
        <h4>CVC: 293</h4>
      </div>
    </StyledChekout>
  );
};

export default Checkout;
