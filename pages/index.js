import { GraphQLClient, gql } from 'graphql-request';
import TopBar from '../components/productSection/TopBar';
import styled from 'styled-components';
import MenuList from '../components/menulist/MenuList';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

const HomeStyle = styled.div`
  /* background-color: lightcoral; */
  display: flex;
  gap: 5%;
  padding: 0 10%;

  .mainProductSection {
    width: 100%;
    .productCardsLayout {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: space-around;
    }
  }
`;

const Home = ({ data }) => {
  console.log('data is ', data);
  const topBarTitle = 'New & Promo Products';
  const productsArray = Object.values(data);

  let myItems = [];

  productsArray.map(items => {
    items.map(item => {
      myItems.push(item);
      return;
    });
  });

  // console.log('myItems is ', myItems);

  return (
    <HomeStyle>
      <div className="menu">
        <MenuList />
      </div>
      <div className="mainProductSection">
        <TopBar title={topBarTitle} />
        <div className="productCardsLayout">
          {myItems.map(item => {
            return (
              <Link href={`/promotions/${item.slug}`} key={item.id}>
                <a>
                  <ProductCard item={item} />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </HomeStyle>
  );
};

export default Home;

const MyQuery = gql`
  {
    cPUs(where: { OR: [{ newproduct: true }, { promotion: true }] }) {
      id
      discount
      images {
        url
      }
      newproduct
      onDiscount
      price
      promotion
      slug
      title
      subtitle
    }
    gPUs(where: { OR: [{ newproduct: true }, { promotion: true }] }) {
      id
      discount
      images {
        url
      }
      newproduct
      onDiscount
      price
      promotion
      slug
      title
      subtitle
    }
    laptops(where: { OR: [{ newproduct: true }, { promotion: true }] }) {
      id
      discount
      images {
        url
      }
      newproduct
      onDiscount
      price
      promotion
      slug
      title
      subtitle
    }
    motherboards(where: { OR: [{ newproduct: true }, { promotion: true }] }) {
      id
      discount
      images {
        url
      }
      newproduct
      onDiscount
      price
      promotion
      slug
      title
      subtitle
    }
    storage_Equipment(
      where: { OR: [{ newproduct: true }, { promotion: true }] }
    ) {
      id
      discount
      images {
        url
      }
      newproduct
      onDiscount
      price
      promotion
      slug
      title
      subtitle
    }
  }
`;

export async function getServerSideProps() {
  const data = await graphcms.request(MyQuery);

  return {
    props: {
      data: data,
    },
  };
}
