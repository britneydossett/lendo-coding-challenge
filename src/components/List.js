import styled from "styled-components";
import { useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 50px;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  box-shadow: 0px 1px 4px #888888;
  padding: 20px;
`;

const Product = styled.div`
  color: #67a167;
  background-color: transparent;

  :visited {
    color: #67a167;
    background-color: transparent;
    text-decoration: none;
  }
`;

const List = () => {
  const data = useStoreState((state) => state.products.items);

  return (
    <ListContainer data-testid="list">
      {data.map((item) => (
        <LinkStyle key={item.id} to={`product/${item.id}`}>
          <Product key={item.id}>
            {item.name} -- {item.price} SEK
          </Product>
        </LinkStyle>
      ))}
    </ListContainer>
  );
};

export default List;
