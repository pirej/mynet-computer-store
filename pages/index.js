import { GraphQLClient, gql } from 'graphql-request';

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

const Home = ({ data }) => {
  console.log('data is ', data);
  return <div>Home</div>;
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
