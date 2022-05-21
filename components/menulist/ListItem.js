import { useState } from 'react';
import styled from 'styled-components';

const StyledItem = styled.div`
  .menuSubmenu {
    display: flex;
    flex-direction: column;
  }
  .subItemDiv {
    position: absolute;
    width: 15rem;
    margin-left: 14.5rem;
    z-index: 200;
  }
`;

const ListItem = props => {
  // console.log('props', props);
  const { itemTitle, uniqueBrands, rawTitle } = props;
  const [brands, setBrands] = useState('');

  const handleOnMouseOver = () => {
    uniqueBrands.length > 1 ? setBrands(uniqueBrands) : '';
    // console.log('over', brands);
  };

  const handleOnMouseLive = () => {
    brands && setBrands('');
    // console.log('leave', brands);
  };
  return (
    <StyledItem
      onMouseOver={() => {
        handleOnMouseOver();
      }}
      onMouseLeave={() => {
        handleOnMouseLive();
      }}
    >
      <div className="menuSubmenu">
        <div className="noBrandItem">
          <p>{itemTitle}</p>
        </div>
        <div className="subItemDiv">
          {brands &&
            brands.map((brand, idx) => {
              return (
                <div key={idx}>
                  <p>{brand}</p>
                </div>
              );
            })}
        </div>
      </div>
    </StyledItem>
  );
};

export default ListItem;
