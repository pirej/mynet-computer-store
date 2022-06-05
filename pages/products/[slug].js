import { GraphQLClient, gql } from 'graphql-request';
import styled from 'styled-components';
import MenuList from '../../components/menulist/MenuList';
import TopBar from '../../components/productSection/TopBar';
import useGetItemDetails from '../../utils/useGetItemDetails';

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
  },
});

const ProductStyle = styled.div`
  /* background-color: lightblue; */
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
    stock,
    numItems,
    mainContent,
  } = useGetItemDetails(item);

  // console.log('item is', item);

  return <ProductStyle>SlugPage</ProductStyle>;
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
