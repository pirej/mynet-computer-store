import { GraphQLClient, gql } from 'graphql-request';
import { RichText } from '@graphcms/rich-text-react-renderer';
import styled from 'styled-components';
import MenuList from '../../components/menulist/MenuList';
import TopBar from '../../components/productSection/TopBar';
import useGetItemDetails from '../../utils/useGetItemDetails';
import Image from 'next/image';
import Link from 'next/link';
import { useProductContext } from '../../state/context/productContext';

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
  },
});

const ProductStyle = styled.div`
  display: flex;
  gap: 5%;
  padding: 0 10%;
  @media (max-width: 1440px) {
    padding: 0 5%;
  }
  @media (max-width: 768px) {
    gap: 0;
  }

  .productSection {
    width: 100%;

    .productInfo {
      display: flex;
      gap: 2rem;
      padding: 2% 3%;
      .text-bold {
        font-weight: bold;
      }
      .text-italic {
        font-style: italic;
      }

      .productDetails {
        /* background-color: lightblue; */
        padding: 0 1rem;

        .subtitle {
          text-align: center;
          padding-bottom: 0.2rem;
          h3 {
            background-color: #e9edf2;
            border: solid 1px #c3ced9;
            padding: 0.3rem 0.4rem;
            border-radius: 4px;
          }
        }
        .productDescriptionTitle {
          text-align: left;
          p {
            font-size: 1.05rem;
            font-weight: bold;
          }
        }

        .allDescription {
          margin: 5%;
        }
        .productInfoLink {
          color: #4d71c6;
          text-decoration: underline;
        }
      }
      .productPreview {
        padding: 0 1rem;
        .previewWrapper {
          text-align: center;
          .promoBanner {
            position: absolute;
            transform: translate(+20%, +40%);
            z-index: 100;
            width: 8vw;
          }
        }
      }
      .prices {
        font-size: 1.1rem;
        p {
          margin: 0.7rem;
        }

        .fadedPrice {
          color: #7c90a6;
          span {
            color: #cc194c;
            font-size: 1.2rem;
            font-weight: 600;
          }
        }
        .newProduct {
          span {
            color: #cc194c;
            font-size: 1.2rem;
            font-weight: 600;
          }
        }

        .promoPrice {
          span {
            color: #cc194c;
            font-size: 1.2rem;
            font-weight: 600;
          }
        }
        .price {
          span {
            font-size: 1.2rem;
            font-weight: 600;
          }
        }
        .warranty {
          span {
            font-weight: 600;
            font-size: 1.2rem;
          }
        }
      }
      .btn {
        padding-top: 0.7rem;
        button {
          display: flex;
          align-items: center;
          margin: auto;
          padding: 0.5rem 2.2rem;
          .cartIconWrap {
            padding-left: 0.5rem;
          }
        }
      }
    }
  }
  @media (max-width: 480px) {
    .productInfo {
      display: flex;
      flex-flow: column;
    }
    .productPreview {
      order: 1;
    }
    .productDetails {
      order: 2;
    }
  }
`;

const ProductByID = ({ product }) => {
  // console.log('product is', product);
  //-----------------------------------------
  const { addToCart } = useProductContext();
  // console.log('ID pushed from slug is', testID);

  //-----------------------------------------
  const productArray = Object.values(product);
  // console.log('productArray is', productArray);

  let item = {};
  productArray.map(items => {
    items.map(i => {
      item = i;
    });
  });

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
    subtitle,
    stock,
    numItems,
    mainContent,
    manufacturer,
    warranty,
  } = useGetItemDetails(item);

  // console.log('item is', item);

  return (
    <ProductStyle>
      <div className="menuSection">
        <MenuList />
      </div>
      <div className="productSection">
        <div className="productTitle">
          <TopBar title={title} />
        </div>
        <div className="productInfo">
          <div className="productDetails">
            <div className="product">
              <div className="subtitle">
                <h3>{subtitle}</h3>
              </div>
              <div className="allDescription">
                <div className="productDescriptionTitle">
                  <p>Product description:</p>
                </div>
                <div className="productDescription">
                  <RichText
                    content={mainContent}
                    renderers={{
                      h1: ({ children }) => (
                        <h1 className="text-normal">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-normal">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-normal">{children}</h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="text-normal">{children}</h4>
                      ),
                      p: ({ children }) => (
                        <p className="text-normal">{children}</p>
                      ),
                      bold: ({ children }) => (
                        <strong className="text-bold">{children}</strong>
                      ),
                      italic: ({ children }) => (
                        <span className="text-italic">{children}</span>
                      ),
                    }}
                  />
                  <a className="productInfoLink" href={manufacturer}>
                    More product details:
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="productPreview">
            <div className="previewWrapper">
              <div className="ImageWrapper">
                <div className="promoBanner">
                  <Image
                    src={imgsrc}
                    height={90}
                    width={145}
                    alt="promo-new-product"
                  />
                </div>
                <Image src={mainImgSrc} height={478} width={478} alt={title} />
              </div>
              <div className="priceSection">
                <div className="prices">
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
                      <p className="newProduct">
                        <span>NEW</span> Product
                      </p>
                      <p className="price">Current price ${price}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="regularProduct">Regular Product</p>
                      <p className="price">Current price ${price}</p>
                    </div>
                  )}
                  <p className="warranty">
                    Warranty: <span>{warranty}</span> months
                  </p>
                </div>
              </div>

              <div className={`btn ${stock < 1 && 'outOfStock'} `}>
                <Link href={`${stock > 0 ? '/cart' : '#'}`} passHref>
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
                    <div className="cartIconWrap">
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
            </div>
          </div>
        </div>
      </div>
    </ProductStyle>
  );
};

export default ProductByID;

export async function getServerSideProps(context) {
  const currentSlug = context.params.id;
  console.log('currentSlug e---', currentSlug);

  const query = gql`
    query ($currentSlug: ID!) {
      cPUs(where: { id: $currentSlug }) {
        id
        price
        promotion
        onDiscount
        newproduct
        discount
        slug
        stock
        title
        subtitle
        images {
          url
        }
        brand
        description {
          raw
        }
        manufacturerLink
        manufacturer
        warranty
      }
      gPUs(where: { id: $currentSlug }) {
        id
        price
        promotion
        onDiscount
        newproduct
        discount
        slug
        stock
        title
        subtitle
        images {
          url
        }
        brand
        description {
          raw
        }
        manufacturerLink
        manufacturer
        warranty
      }
      laptops(where: { id: $currentSlug }) {
        id
        price
        promotion
        onDiscount
        newproduct
        discount
        slug
        stock
        title
        subtitle
        images {
          url
        }
        brand
        description {
          raw
        }
        manufacturerLink
        manufacturer
        warranty
      }
      motherboards(where: { id: $currentSlug }) {
        id
        price
        promotion
        onDiscount
        newproduct
        discount
        slug
        stock
        title
        subtitle
        images {
          url
        }
        brand
        description {
          raw
        }
        manufacturerLink
        manufacturer
        warranty
      }
      storage_Equipment(where: { id: $currentSlug }) {
        id
        price
        promotion
        onDiscount
        newproduct
        discount
        slug
        stock
        title
        subtitle
        images {
          url
        }
        brand
        description {
          raw
        }
        manufacturerLink
        manufacturer
        warranty
      }
    }
  `;

  const variables = { currentSlug };
  const product = await graphcms.request(query, variables);

  return {
    props: {
      product: product,
    },
  };
}
