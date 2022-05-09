import React from 'react';
import styled from 'styled-components';

const FooterStyled = styled.footer`
  background-color: #004695;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-top: auto;
  p {
    color: #e9edf2;
  }
`;

const Footer = () => {
  let date = new Date().getFullYear();

  return (
    <FooterStyled>
      <p>&copy; Igor Risteski {date}</p>
    </FooterStyled>
  );
};

export default Footer;
