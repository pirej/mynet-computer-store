import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useProductContext } from '../../state/context/productContext';

const Navigation = styled.div`
  background-color: #004695;
  .topHeader {
    display: flex;
    justify-content: space-between;
    padding: 0 10%;
    height: 7rem;
    align-items: center;
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
            <a>
              <Image src="/svg.svg" height={78} width={232} alt="logo" />
            </a>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/api/auth/login">login</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/api/auth/logout">logout</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/contact">contact</Link>
            </li>
          </ul>
          <div className={`cartWrapper ${itemsInCart > 0 && 'lessPadding'}`}>
            <Link href="/cart">
              <a>
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
              </a>
            </Link>
          </div>
        </nav>
      </div>
    </Navigation>
  );
};

export default MainNavigation;
