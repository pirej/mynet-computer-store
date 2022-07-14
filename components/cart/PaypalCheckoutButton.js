import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useProductContext } from '../../state/context/productContext';

const PaypalCheckoutButton = ({ cartAmount }) => {
  const { clearCart } = useProductContext();

  return (
    <PayPalScriptProvider
      options={{
        'client-id': `${process.env.NEXT_PUBLIC_REACT_APP_PAYPAL_CLIENT_ID}`,
      }}
    >
      <div>
        <PayPalButtons
          style={{
            color: 'blue',
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: cartAmount,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(details => {
              const name = details.payer.name.given_name;
              alert(`Transaction completed by ${name}`);
            });
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PaypalCheckoutButton;
