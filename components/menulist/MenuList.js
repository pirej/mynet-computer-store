import React from 'react';
import styled from 'styled-components';
import ListItemFake from './ListItemFake';

const StyledMenu = styled.div`
  background-color: lightcoral;
`;

const MenuList = () => {
  return (
    <StyledMenu>
      <div className="titleSection">
        <h3>Products</h3>
      </div>
      <ListItemFake />
    </StyledMenu>
  );
};

export default MenuList;
