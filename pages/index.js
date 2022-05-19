import { GraphQLClient, gql } from 'graphql-request';
import TopBar from '../components/productSection/TopBar';
import styled from 'styled-components';
import MenuList from '../components/menulist/MenuList';

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

const HomeStyle = styled.div`
  /* background-color: lightcoral; */
`;

const Home = ({ data }) => {
  console.log('data is ', data);
  return (
    <HomeStyle>
      <div className="menu">
        <MenuList />
      </div>
      <div className="mainProductSection">
        <TopBar />
        <div className="productCardsLayout">Home</div>
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
