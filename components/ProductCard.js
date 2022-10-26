import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import useGetItemDetails from '../utils/useGetItemDetails';
import { useProductContext } from '../state/context/productContext';
import AddToCart from '../pages/cart';

const CardStyle = styled.div`
  margin-bottom: 2rem;
  .cardFrame {
    text-align: center;
    padding: 0.3rem 1rem;
    margin-top: 1rem;
    .imgWrapper {
      display: flex;
      justify-content: center;
    }
    .promoBanner {
      position: absolute;
      z-index: 100;
    }

    h3 {
      margin: 0;
      color: #3f6795;
    }
    p {
      margin: 0.2rem 0;
    }

    .fadedPrice {
      color: #7c90a6;
      span {
        color: #cc194c;
        font-weight: 700;
      }
    }
    .newProductSub {
      color: #7c90a6;
      span {
        color: #cc194c;
        font-weight: 700;
      }
    }

    .promoPrice {
      span {
        color: #cc194c;
        font-size: 1.1rem;
      }
    }
    .price {
      span {
        /* color: #cc194c; */
        font-size: 1.1rem;
      }
    }
    :hover {
      cursor: pointer;
    }
  }
  .btn {
    text-align: center;
    margin-top: 0.2rem;
    button {
      display: flex;
      align-items: center;
      margin: auto;
      .cartIcoWrap {
        padding-left: 0.5rem;
      }
    }
  }
`;

const ProductCard = ({ item }) => {
  const { banner, setBanner } = useState(false);
  //--------------------------------------------
  const { addToCart } = useProductContext();
  // console.log('ID pushed from ProductCard is', testID);
  //--------------------------------------------
  const {
    isNewProd,
    isPromoProd,
    price,
    tempPrice,
    discount,
    discountPrice,
    imgsrc,
    mainImgSrc,
    id,
    title,
    stock,
    numItems,
    mainContent,
  } = useGetItemDetails(item);
  //--------------------------------------------

  return (
    <CardStyle>
      <div className={`cardFrame ${stock < 1 && 'outOfStock'}`}>
        <div className="promoBanner">
          {imgsrc && (
            <Image
              src={imgsrc}
              height={62}
              width={100}
              alt="promo-new-product"
              className={'overlay-img'}
            />
          )}
        </div>
        <div className="imgWrapper">
          <Image
            src={item.images.url || item.images[0].url}
            height={200}
            width={200}
            alt="product-image"
            className={'main-image'}
          />
        </div>
        <h3>{item.title}</h3>
        {isPromoProd ? (
          <div>
            <p className="fadedPrice">
              Price: ${price} <span>-{discount}% OFF</span>
            </p>
            <p className="promoPrice">
              Promo price = <span>${discountPrice}</span>
            </p>
          </div>
        ) : isNewProd ? (
          <div>
            <p className="newProductSub">
              <span>NEW</span> Product
            </p>
            <p className="price">
              Current price: <span>${price}</span>
            </p>
          </div>
        ) : (
          <div>
            <p className="regularProductSub">Regular Product</p>
            <p className="price">
              Regular price: <span>${price}</span>
            </p>
          </div>
        )}
      </div>
      <div className={`btn ${stock < 1 && 'outOfStock'}`}>
        <Link href={`${stock > 0 ? '/cart' : '#'}`} passHref legacyBehavior>
          <button
            onClick={() =>
              stock > 0
                ? addToCart(
                    id,
                    title,
                    stock,
                    price,
                    discount,
                    mainImgSrc,
                    numItems
                  )
                : ''
            }
          >
            {stock > 0 ? 'Add to Cart' : 'Out of Stock'}

            <div className="cartIcoWrap">
              <Image
                src="/cartIcon-white.svg"
                height={18}
                width={18}
                alt="cartIcon"
              />
            </div>
          </button>
        </Link>
      </div>
    </CardStyle>
  );
};

export default ProductCard;
