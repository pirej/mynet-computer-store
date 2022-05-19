import React from 'react';
import styled from 'styled-components';
import ListItemFake from './ListItemFake';

const StyledMenu = styled.div`
  background-color: lightblue;
  .menuSection {
    min-width: 14.5rem;
    max-width: 14.5rem;
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
          }
        }
      }
    }
  }
`;

const MenuList = () => {
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
        </div>
      </div>

      <ListItemFake />
    </StyledMenu>
  );
};

export default MenuList;
