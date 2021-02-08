import styled from "styled-components";
import { useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const List = () => {
  const data = useStoreState((state) => state.products.items);

  console.log("component", data);

  return (
    <ListContainer>
      {data.map((item) => (
        <Link to={`product/${item.id}`}>
          <div key={item.id}>
            {item.name} -- {item.price}
          </div>
        </Link>
      ))}
    </ListContainer>
  );
};

export default List;
