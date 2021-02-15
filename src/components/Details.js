/* eslint-disable jsx-a11y/no-onchange */
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const DetailsContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  padding: 60px 100px;
`;

const NotAvailable = styled.div`
  color: red;
`;

const Options = styled.button`
  background-color: black;
  border: none;
  border-radius: 6px;
  color: white;
  margin: 0px 10px 0px 0px;
  max-width: 125px;
  padding: 10px;
  :focus {
    outline: #67a167 auto 2px;
  }
  :disabled {
    background-color: #d6d5d2;
  }
`;

const SelectionMessage = styled.p`
  color: #67a167;
`;

const AddToCartButton = styled.button`
  background-color: #67a167;
  border: none;
  border-radius: 6px;
  height: 60px;
  width: 150px;
  :focus {
    outline: black auto 2px;
  }
  :disabled {
    background-color: #d6d5d2;
  }
`;

const Details = () => {
  const { id } = useParams();
  const product = useStoreState((state) => state.getProduct(id));
  const handleAddToCart = useStoreActions((state) => state.addToCart);
  // LocalOptions = options selected by user
  const [localOptions, setOptions] = useState({});

  const { id: productId, name, brand, price, available, weight, options } = product;

  // The following 2 functions handle user choices for options by storing in local state
  const handleChangeOptions = (e) => {
    setOptions({
      ...localOptions,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectOption = (idx) => {
    setOptions(product.options[idx]);
  };

  // Maps over options and allows you to select using drop down
  const Select = ({ option, values }) => (
    <select key={option.color} name={option} id={option} onChange={handleChangeOptions}>
      {values.map((val) => (
        <option key={val} value={val}>
          {val}
        </option>
      ))}
    </select>
  );

  // Takes keys from array of objects (options) and displays data based off those keys
  const Option = ({ option, value }) => (
    <div key={option.color}>
      {option}:{" "}
      {typeof value === "object" && value.length > 1 ? (
        <Select key={option.color} option={option} values={value} />
      ) : (
        value
      )}
    </div>
  );

  if (!product) return null;

  return (
    <DetailsContainer>
      {/* data-test-id is for testing */}
      <div data-test-id="details">Name: {name}</div>
      <div>Product Id: {productId}</div>
      <div>Brand: {brand}</div>
      <div>Weight: {weight}</div>
      <div>Price: {price}</div>
      <NotAvailable>{!available ? "Product Not Available" : null}</NotAvailable>
      <div>
        {/* product options - DOES NOT CHANGE */}
        {options.map((option, idx) => (
          <Options
            type="button"
            key={option.color}
            disabled={option.quantity < 1}
            onClick={() => handleSelectOption(idx)}
          >
            {option.color}
          </Options>
        ))}
        {!localOptions.color ? <SelectionMessage>Please select color</SelectionMessage> : null}

        {/* local options, THESE CHANGE */}
        {localOptions &&
          Object.keys(localOptions).map((key) => (
            <Option key={key} option={key} value={localOptions[key]} />
          ))}
      </div>

      {/* send the product with the chosen options to the cart */}
      <AddToCartButton
        className="addToCart"
        type="button"
        disabled={!available || !localOptions.color}
        onClick={() =>
          handleAddToCart({
            ...product,
            id: `${product.id}-${localOptions.color.toString()}`,
            options: localOptions,
          })
        }
      >
        Add To Cart
      </AddToCartButton>
    </DetailsContainer>
  );
};

export default Details;
