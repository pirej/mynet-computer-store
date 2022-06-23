import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useProductContext } from '../../state/context/productContext';

const StyledCartItem = styled.div`
  margin: 0 5%;
  .cardWrapper {
    /* background-color: lightblue; */
    display: flex;
    align-items: center;
    /* justify-content: space-around; */

    .imgAndTitle {
      flex: 1;
      position: relative;
      cursor: pointer;
      text-align: left;
    }

    /*----------*/
    .price {
      flex: 1;
      text-align: left;
      padding-left: 4%;
    }

    .quantity {
      flex: 1;
    }

    .subtotal {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      .clearBTN {
        margin-left: 15px;
        cursor: pointer;
      }
    }
    /*----------*/
  }
`;

function insertDecimal(num) {
  return (num / 100).toFixed(2);
}

const CartComponent = ({ item }) => {
  // console.log('item is ', item);
  //---------
  const { removeItem } = useProductContext();
  //---------
  const fullPrice = item.price * 100;
  const price = item.discount
    ? insertDecimal(fullPrice - fullPrice * (item.discount / 100))
    : insertDecimal(fullPrice);

  //---------
  return (
    <StyledCartItem>
      <div className="cardWrapper">
        <div className="imgAndTitle">
          <Link href={`/cart/${item.id}`}>
            <div className="imgWrapper">
              <Image
                src={item.mainImgSrc}
                height={80}
                width={80}
                alt="product-image"
              />
            </div>
          </Link>
        </div>
        <div className="price">
          <p>${price}</p>
        </div>
        <div className="quantity">
          <p>{item.numItems}</p>
        </div>
        <div className="subtotal">
          $
          {insertDecimal(
            fullPrice * item.numItems -
              fullPrice * item.numItems * (item.discount / 100)
          )}
          <span className="clearBTN" onClick={() => removeItem(item.id)}>
            <Image
              src="/deleteItem.png"
              height={14}
              width={14}
              alt="remove item from cart"
            />
          </span>
        </div>
      </div>
    </StyledCartItem>
  );
};

export default CartComponent;
