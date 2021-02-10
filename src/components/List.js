import styled from "styled-components";
import { useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 50px;

  a:link {
    color: #9f68d4;
    background-color: transparent;
    text-decoration: none;
  }

  a:visited {
    color: #9f68d4;
    background-color: transparent;
    text-decoration: none;
  }
`;

const List = () => {
  const data = useStoreState((state) => state.products.items);

  console.log("component", data);

  return (
    <ListContainer>
      {data.map((item) => (
        <Link to={`product/${item.id}`}>
          <div key={item.id}>
            {item.name} -- {item.price} SEK
          </div>
        </Link>
      ))}
    </ListContainer>
  );
};

export default List;
