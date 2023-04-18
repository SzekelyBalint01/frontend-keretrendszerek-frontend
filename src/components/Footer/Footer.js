import styled from "styled-components";

const FooterContainer = styled.footer`
  color: grey;
  opacity: 0.7;
  position: fixed;
  index-z: 1;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2023 Pte Proginfo</p>
    </FooterContainer>
  );
};

export default Footer;
