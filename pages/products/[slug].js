import { GraphQLClient, gql } from 'graphql-request';
import { RichText } from '@graphcms/rich-text-react-renderer';
import styled from 'styled-components';
import MenuList from '../../components/menulist/MenuList';
import TopBar from '../../components/productSection/TopBar';
import useGetItemDetails from '../../utils/useGetItemDetails';
import Image from 'next/image';

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
  },
});

const ProductStyle = styled.div`
  /* background-color: lightblue; */
  display: flex;
  gap: 5%;
  padding: 0 10%;

  .productSection {
    width: 100%;

    .text-bold {
      font-weight: bold;
    }
    .text-italic {
      font-style: italic;
    }
  }
`;

const SlugPage = ({ product }) => {
  // console.log('product is', product);

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
                  <a href={manufacturer}>More product details:</a>
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
            </div>
          </div>
        </div>
      </div>
    </ProductStyle>
  );
};

export default SlugPage;

export async function getServerSideProps(context) {
  const currentSlug = context.params.slug;

  const query = gql`
    query ($currentSlug: String!) {
      cPUs(where: { slug: $currentSlug }) {
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
      gPUs(where: { slug: $currentSlug }) {
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
      laptops(where: { slug: $currentSlug }) {
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
      motherboards(where: { slug: $currentSlug }) {
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
      storage_Equipment(where: { slug: $currentSlug }) {
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
