/* eslint-disable jsx-a11y/no-onchange */
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const DetailsContainer = styled.div`
  padding: 60px 100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const Options = styled.button`
  padding: 10px;
  margin: 0px 10px 0px 0px;
  max-width: 125px;
  color: white;
  background-color: black;
  border-radius: 6px;
  border: none;
  :focus {
    outline: #9f68d4 auto 2px;
  }
`;

const AddToCartButton = styled.button`
  background-color: #9f68d4;
  border-radius: 6px;
  border: none;
  width: 150px;
  height: 60px;
  :focus {
    outline: black auto 2px;
  }
`;

const Details = () => {
  const { id } = useParams();
  const product = useStoreState((state) => state.getProduct(id));
  const handleAddToCart = useStoreActions((state) => state.addToCart);
  // local state [item, fn]
  const [localOptions, setOptions] = useState({});

  const { id: productId, name, brand, price, available, weight, options } = product;

  const handleChangeOptions = (e) => {
    setOptions({
      ...localOptions,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectOption = (idx) => {
    setOptions(product.options[idx]);
  };

  const Select = ({ option, values }) => (
    <select key={option} name={option} id={option} onChange={handleChangeOptions}>
      {values.map((val) => (
        <option value={val}>{val}</option>
      ))}
    </select>
  );

  const Option = ({ option, value }) => (
    <div key={option}>
      {option}:{" "}
      {typeof value === "object" && value.length > 1 ? (
        <Select option={option} values={value} />
      ) : (
        value
      )}
    </div>
  );

  if (!product) return null;

  console.log(localOptions);
  return (
    <DetailsContainer>
      <div>Product Id: {productId}</div>
      <div>Name: {name}</div>
      <div>Brand: {brand}</div>
      <div>Price: {price}</div>
      <div>Available: {available ? "yes" : "no"}</div>
      <div>Weight: {weight}</div>
      <div>
        {/* product options - DOES NOT CHANGE */}
        {options.map((option, idx) => (
          <Options type="button" key={option.color} onClick={() => handleSelectOption(idx)}>
            {option.color}
          </Options>
        ))}

        {/* local options, THESE CHANGE */}
        {localOptions &&
          Object.keys(localOptions).map((key) => <Option option={key} value={localOptions[key]} />)}
      </div>

      {/* send the product with the chosen options to the cart */}
      <AddToCartButton
        className="addToCart"
        type="button"
        onClick={() => handleAddToCart({ ...product, options: localOptions })}
      >
        Add To Cart
      </AddToCartButton>
    </DetailsContainer>
  );
};

export default Details;
