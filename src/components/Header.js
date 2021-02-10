import styled from "styled-components";
import { useStoreState } from "easy-peasy";
import { NavLink } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  border-bottom: 1px solid black;
  max-height: 20px;
  padding: 15px 35px;
  overflow: hidden;
  background-color: black;
  color: white;
  a:link {
    color: white;
    background-color: transparent;
    text-decoration: none;
  }

  a:visited {
    color: #9f68d4;
    background-color: transparent;
    text-decoration: none;
  }
`;

const Header = () => {
  const itemsInCartCount = useStoreState((state) => state.itemsInCartCount);

  return (
    <HeaderContainer>
      <NavLink to="/">Products</NavLink>
      <NavLink to="/cart">CART: {itemsInCartCount}</NavLink>
    </HeaderContainer>
  );
};

export default Header;
