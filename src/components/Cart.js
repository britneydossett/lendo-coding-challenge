import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const CartContainer = styled.div`
  padding: 50px;
`;

const Product = styled.div`
  display: grid;
  grid-template-columns: 20% 10% 20% 10% 5% 5% 10% 20%;
  margin-bottom: 30px;
`;

const QuantityButton = styled.button`
  background-color: #67a167;
  border-radius: 6px;
  border: none;
  width: 30px;
  height: 30px;
  :focus {
    outline: black auto 2px;
  }
`;

const RemoveButton = styled.button`
  background-color: black;
  border-radius: 6px;
  border: none;
  color: white;
  width: 60px;
  height: 30px;
  :focus {
    outline: #67a167 auto 2px;
  }
`;

const Cart = () => {
  const cart = useStoreState((state) => state.cart);
  const cartTotal = useStoreState((state) => state.cartTotal);

  const handleIncrementQuantity = useStoreActions(({ incrementQuantity }) => incrementQuantity);
  const handleDecrementQuantity = useStoreActions(({ decrementQuantity }) => decrementQuantity);
  const handleRemoveFromCart = useStoreActions(({ removeFromCart }) => removeFromCart);

  return (
    <CartContainer data-test-id="cart">
      {cart.map((product) => {
        return (
          <Product key={`${product.id}-${product.options.color}`}>
            <div>{product.name}</div>
            <div>price: ${product.price}</div>
            <div>
              {/* map over product options */}
              {Object.keys(product.options).map((key) => {
                return (
                  <div key={key}>
                    {key}: {product.options[key]}
                  </div>
                );
              })}
            </div>
            <div>
              quantity:
              <input
                style={{ width: "40px", marginLeft: "20px" }}
                id="quantity"
                name="quantity"
                value={product.quantity || 0}
                readOnly
              />
            </div>
            <QuantityButton type="button" onClick={() => handleDecrementQuantity(product.id)}>
              -
            </QuantityButton>
            <QuantityButton type="button" onClick={() => handleIncrementQuantity(product.id)}>
              +
            </QuantityButton>
            <RemoveButton type="button" onClick={() => handleRemoveFromCart(product.id)}>
              remove
            </RemoveButton>
            <div> product total: {product.total} SEK</div>
          </Product>
        );
      })}
      TOTAL: {cartTotal} SEK
    </CartContainer>
  );
};

export default Cart;
