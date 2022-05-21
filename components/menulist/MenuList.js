import { GraphQLClient, gql } from 'graphql-request';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import ListItemFake from './ListItemFake';
import ListItem from './ListItem';

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
  },
});

const query = gql`
  {
    cPUs {
      id
      brand
      title
      slug
    }
    gPUs {
      id
      brand
      title
      slug
    }
    laptops {
      id
      brand
      title
      slug
    }
    motherboards {
      id
      brand
      title
      slug
    }
    storage_Equipment {
      id
      brand
      title
      slug
    }
  }
`;

const StyledMenu = styled.div`
  background-color: lightblue;
  .menuSection {
    min-width: 14.5rem;
    max-width: 14.5rem;
    margin-bottom: 2rem;
    .menuTitleSection {
      .menuTitle {
        background-color: #004695;
        text-align: center;
        border-radius: 6px 6px 0 0;

        .titleSection {
          h3 {
            color: #e9edf2;
            font-weight: 400;
            letter-spacing: 0.05rem;
            padding: 0.3rem 0;
            margin-bottom: 0;
          }
        }
      }
    }

    p {
      padding: 0.2rem 0 0.2rem 0.8rem;
      border: solid 1px #d3dce5;
      background-color: #e9edf2;
      margin: 0;
      :hover {
        cursor: pointer;
        background-color: #c3ced9;
        border-color: #d1dfed;
      }
    }

    .bottomBar {
      background-color: #004695;
      text-align: center;
      border-radius: 0 0 6px 6px;

      h3 {
        color: #e9edf2;
        font-weight: 400;
        letter-spacing: 0.05rem;
        padding: 0.3rem 0;
        margin-bottom: 0;
        margin-top: 0;
      }
    }
  }
`;

const MenuList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getMenuItems() {
      const data = await graphcms.request(query);
      setData(data);
    }
    getMenuItems();
  }, []);

  //-----------------------------
  const productsArr = Object.values(data);
  const productsListArr = Object.keys(data);
  //-----------------------------

  return (
    <StyledMenu>
      <div className="menuOnLeft">
        <div className="menuSection">
          <div className="menuTitleSection">
            <div className="menuTitle">
              <div className="titleSection">
                <h3>Products</h3>
              </div>
            </div>
          </div>
          <div>
            <Link href="/">
              <p>New & Promo Products</p>
            </Link>
          </div>
          {productsListArr.map((item, idx) => {
            const spaced = item.replace('_', ' ');
            const listItemTitle =
              spaced.charAt(0).toUpperCase() + spaced.slice(1);
            const productBrands = productsArr[idx].map((item, idx) => {
              return item.brand;
            });

            const uniqueBrands = [...new Set(productBrands)];
            return (
              <ListItem
                key={idx}
                // itemDetails={productsArr[idx]}
                itemTitle={listItemTitle}
                uniqueBrands={uniqueBrands}
                rawTitle={item}
              />
            );
          })}
          <ListItemFake />
          <div className="bottomBar">
            <h3>Products ↑</h3>
          </div>
        </div>
      </div>
    </StyledMenu>
  );
};

export default MenuList;
