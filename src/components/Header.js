import styled from "styled-components";
import { useStoreState } from "easy-peasy";
import { NavLink } from "react-router-dom";

const HeaderContainer = styled.div`
  background-color: black;
  border-bottom: 1px solid black;
  color: #86d186;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  max-height: 20px;
  overflow: hidden;
  padding: 15px 35px;
`;

const LinkStyle = styled(NavLink)`
  background-color: transparent;
  color: #86d186;
  text-decoration: none;

  :visited {
    color: #86d186;
    background-color: transparent;
    text-decoration: none;
  }
`;

const Header = () => {
  const itemsInCartCount = useStoreState((state) => state.itemsInCartCount);

  return (
    <HeaderContainer>
      <LinkStyle to="/">Products</LinkStyle>
      <LinkStyle to="/cart">CART: {itemsInCartCount}</LinkStyle>
    </HeaderContainer>
  );
};

export default Header;
