import styled from "styled-components";
import { useStoreState } from "easy-peasy";
import { NavLink } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
