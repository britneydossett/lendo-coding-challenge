import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Cart = () => {
  const cart = useStoreState((state) => state.cart);
  const cartTotal = useStoreState((state) => state.cartTotal);

  const handleIncrementQuantity = useStoreActions(({ incrementQuantity }) => incrementQuantity);
  const handleDecrementQuantity = useStoreActions(({ decrementQuantity }) => decrementQuantity);
  const handleRemoveFromCart = useStoreActions(({ removeFromCart }) => removeFromCart);
  console.log(cart);

  return (
    <CartContainer>
      {cart.map((product) => {
        return (
          <Product key={product.id}>
            <div>{product.name}</div>
            <div>price: ${product.price}</div>
            <div>
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
              />
            </div>
            <button type="button" onClick={() => handleDecrementQuantity(product.id)}>
              -
            </button>
            <button type="button" onClick={() => handleIncrementQuantity(product.id)}>
              +
            </button>
            <button type="button" onClick={() => handleRemoveFromCart(product.id)}>
              remove
            </button>
            <div> product total: {product.total} </div>
          </Product>
        );
      })}
      TOTAL: {cartTotal}
    </CartContainer>
  );
};

export default Cart;
