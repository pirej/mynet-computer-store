import { GraphQLClient, gql } from 'graphql-request';
import styled from 'styled-components';
import MenuList from '../../../components/menulist/MenuList';
import ProductCard from '../../../components/ProductCard';
import TopBar from '../../../components/productSection/TopBar';
import Link from 'next/link';
import { useRouter } from 'next/router';

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
  },
});

const AllProductsStyle = styled.div`
  /* background-color: teal; */
  display: flex;
  gap: 5%;
  padding: 0 10%;
  @media (max-width: 1440px) {
    padding: 0 5%;
  }
  @media (max-width: 768px) {
    gap: 0;
  }

  .mainProductSection {
    width: 100%;
    .productCarsLayout {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
`;

const BrandOfProducts = ({ data }) => {
  // console.log('data is', data);

  const router = useRouter();
  const currentBrand = router.query.brand.split('-')[0];

  // console.log('currentBrand', currentBrand);

  if (data) {
    const productsArray = Object.values(data)[0];
    // console.log('productsArray is', productsArray);
    return (
      <AllProductsStyle>
        <div className="menu">
          <MenuList />
        </div>
        <div className="mainProductSection">
          <TopBar title={currentBrand} />
          <div className="productCarsLayout">
            {productsArray.map(item => {
              return (
                <Link href={`/products/${item.slug}`} key={item.id}>
                  <a>
                    <ProductCard item={item} />
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </AllProductsStyle>
    );
  }
};

export default BrandOfProducts;

export async function getServerSideProps(context) {
  // console.log('params', context.params.title);

  const separated = context.params.brand.split('-');

  const theBrand = separated[0];
  const theProducts = separated[1];

  console.log('separated', separated);

  const query = gql`
    query ($theBrand: String!){
      ${theProducts}(where: { brand: $theBrand }) {
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

  const variables = { theBrand };
  const data = await graphcms.request(query, variables);

  return {
    props: {
      data: data,
    },
  };
}
