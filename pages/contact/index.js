import React from 'react';
import styled from 'styled-components';
import MenuList from '../../components/menuList/MenuList';
import TopBar from '../../components/productSection/TopBar';

const ContactStyle = styled.div`
  /* background-color: lightblue; */
  display: flex;
  padding: 0 10%;
  gap: 5%;
  .mainContactSection {
    width: 100%;
  }
`;

const ContactPage = () => {
  const topBarTitle = 'Contact';
  return (
    <ContactStyle>
      <MenuList />
      <div className="mainContactSection">
        <TopBar title={topBarTitle} />
      </div>
    </ContactStyle>
  );
};

export default ContactPage;
