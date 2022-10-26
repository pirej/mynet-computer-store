import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useProductContext } from '../../state/context/productContext';
import { useUser } from '@auth0/nextjs-auth0';

const Navigation = styled.div`
  background-color: #004695;
  .topHeader {
    display: flex;
    justify-content: space-between;
    padding: 0 10%;
    height: 7rem;
    align-items: center;
    @media (max-width: 1440px) {
      padding: 0 5%;
    }
    @media (max-width: 590px) {
      flex-direction: column;
      height: 10rem;
      padding-top: 1rem;
    }
  }
  nav {
    display: flex;
    align-items: center;
    ul {
      li {
        color: #e9edf2;
        list-style: none;
      }
    }
    .cartWrapper {
      display: flex;
      padding-left: 3rem;

      .fullCart {
        display: flex;
        align-items: center;
        .items {
          position: relative;
          display: flex;
          align-items: flex-start;
          z-index: 100;
          transform: translate(10px, -13px);
          .numbers {
            position: absolute;
            z-index: 200;
            width: 24px;
            text-align: center;
            p {
              color: #e9edf2;
              margin: 0;
            }
          }
        }
      }
    }
    .lessPadding {
      padding-left: 1.5rem;
    }
  }
`;

const MainNavigation = () => {
  const [loading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const { cart } = useProductContext();

  const allItemsFromCart = [];

  if (!loading) {
    cart.map(item => {
      allItemsFromCart.push(item.numItems);
    });
  }

  const initialAmount = 0;
  const itemsInCart = allItemsFromCart.reduce(
    (previousAmount, currentAmount) => previousAmount + currentAmount,
    initialAmount
  );

  // console.log('itemsInCart', itemsInCart);
  return (
    <Navigation>
      <div className="topHeader">
        <div className="imageWrapper">
          <Link href="/">

            <Image src="/svg.svg" height={78} width={232} alt="logo" />

          </Link>
        </div>
        <nav>
          <ul>
            <li>
              {user ? (
                <Link href="/user/logout" legacyBehavior>{`hi ${user.nickname}`}</Link>
              ) : (
                <Link href="/user/login">login</Link>
              )}
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/contact">contact</Link>
            </li>
          </ul>
          <div className={`cartWrapper ${itemsInCart > 0 && 'lessPadding'}`}>
            <Link href="/cart">

              <div className="fullCart">
                {itemsInCart > 0 && (
                  <div className="items">
                    <div className="numbers">
                      <p>{itemsInCart}</p>
                    </div>
                    <Image
                      src="/cartItems.svg"
                      height={24}
                      width={24}
                      alt="itemsInCart"
                    />
                  </div>
                )}
                <div className="cart">
                  <Image
                    src="/cartIcon.svg"
                    height={24}
                    width={24}
                    alt="cartIcon"
                  />
                </div>
              </div>

            </Link>
          </div>
        </nav>
      </div>
    </Navigation>
  );
};

export default MainNavigation;
