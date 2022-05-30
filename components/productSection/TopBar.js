import styled from 'styled-components';

const StyledTopBar = styled.div`
  .sectionTitle {
    background-color: #004695;
    text-align: center;
    border-radius: 6px 6px 0 0;

    .menuTitle {
      h3 {
        color: #e9edf2;
        font-weight: 400;
        letter-spacing: 0.05rem;
        padding: 0.3rem 0;
      }
    }
  }
`;

const TopBar = props => {
  return (
    <StyledTopBar>
      <div className="sectionTitle">
        <div className="menuTitle">
          {props.title ? <h3>{props.title}</h3> : <h3>Products</h3>}
        </div>
      </div>
    </StyledTopBar>
  );
};

export default TopBar;
