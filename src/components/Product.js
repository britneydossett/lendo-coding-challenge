import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useParams } from "react-router-dom";

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Product = () => {
  const { id } = useParams();
  const product = useStoreState((state) => state.getProduct(id));
  const handleAddToCart = useStoreActions(({ addToCart }) => addToCart);

  if (!product) return null;
  const { id: productId, name, brand, price, options, available, weight } = product;

  const Select = ({ option, values }) => (
    <select name={option} id={option}>
      {values.map((val) => (
        <option value={val}>{val}</option>
      ))}
    </select>
  );

  const Option = ({ option, value, index }) => {
    return (
      <div key={index}>
        {option}:{" "}
        {typeof value === "object" ? (
          <Select option={option} values={value} />
        ) : (
          <button key={value} type="button">
            {value}
          </button>
        )}
      </div>
    );
  };

  return (
    <ProductContainer key={productId}>
      <div>productId: {productId}</div>
      <div>name: {name}</div>
      <div>brand: {brand}</div>
      <div>price: {price}</div>
      <div>available: {available ? "yes" : "no"}</div>
      <div>weight: {weight}</div>
      <div>
        {options.map((option) => {
          return Object.keys(option).map((key, index) => {
            console.log(`key: ${key}, value: ${option[key]}`);
            return <Option option={key} value={option[key]} index={index} />;
          });
        })}
      </div>
      <button type="button" disabled={!available} onClick={() => handleAddToCart(product)}>
        Add To Cart
      </button>
    </ProductContainer>
  );
};

export default Product;
