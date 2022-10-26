import { GraphQLClient, gql } from 'graphql-request';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ListItemFake from './ListItemFake';
import ListItem from './ListItem';
import Image from 'next/image';

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
  /* background-color: lightblue; */

  .sidebar {
    .menuIcon {
      display: none;
      margin-top: 1.59rem;
      margin-left: 0.25rem;
      @media (max-width: 768px) {
        display: block;
        position: absolute;
        cursor: pointer;
      }
      @media (max-width: 480px) {
        margin-top: 1.55rem;
        margin-left: 0.2rem;
      }
      @media (max-width: 360px) {
        margin-top: 1.5rem;
        margin-left: 0.2rem;
      }
    }
  }
  .menuOnLeft {
    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .hideMenu {
      display: none;
    }
    .showMenu {
      display: block;
      position: absolute;
      z-index: 300;
      margin-top: 2.5rem;
    }
  }

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
        background-color: #d1dfed;
        border-color: #c3ced9;
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
  const [menuHidden, setMenuHidden] = useState(true);

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
  function handleMenuOnClick() {
    // console.log('menu icon clicked');
    setMenuHidden(!menuHidden);
  }
  //--------
  // console.log('menuHidden is -', menuHidden);
  const openMenuIcon = '/menu.svg';
  const closedMenuIcon = '/menu-close.svg';
  //-----------------------------

  return (
    <StyledMenu>
      <div className="wrapper">
        <div className="sidebar">
          <div onClick={handleMenuOnClick} className="menuIcon">
            <Image
              // src="/menuRed.svg"
              src={menuHidden ? openMenuIcon : closedMenuIcon}
              height={20}
              width={35}
              alt="menu"
              priority="true"
            />
          </div>
        </div>
        {/* <div className="menuOnLeft"> */}
        <div className={`menuOnLeft ${menuHidden ? 'hideMenu' : 'showMenu'} `}>
          <div className="menuSection">
            <div className="menuTitleSection">
              <div className="menuTitle">
                <div className="titleSection">
                  <h3>Products</h3>
                </div>
              </div>
            </div>
            <div>
              <Link href="/" legacyBehavior>
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
      </div>
    </StyledMenu>
  );
};

export default MenuList;
