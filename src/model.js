/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
import { action, computed, actionOn } from "easy-peasy";
import products from "./products.json";

const removeProduct = (data, id) => {
  return data.filter((product) => product.id !== id);
};

export default {
  products,
  cart: [],
  showAddToCart: false,

  // GETTERS
  itemsInCartCount: computed((state) => Object.keys(state.cart).length),
  cartTotal: computed(({ cart }) => cart.reduce((res, curr) => res + parseInt(curr.total, 10), 0)),
  getProduct: computed((state) => (id) => state.products.items.find((product) => product.id == id)),

  // ACTIONS
  updateProduct: action((state, payload) => {
    const index = state.cart.findIndex((product) => product.id === payload.id);
    state.cart[index] = payload;
  }),

  onCartUpdate: actionOn(
    // listening to all of the following actions to perform this update.
    (actions) => [actions.decrementQuantity, actions.incrementQuantity, actions.removeFromCart],
    (state, { payload }) => {
      // we need to update the product in the cart with the new total.
      const cartProduct = state.cart.find((p) => p.id === payload);
      // current total = the price * (updated) quantity of that product.
      cartProduct.total = cartProduct.quantity * parseInt(cartProduct.price, 10);
      // after this happens, getTotal (computed) above, will update the cartTotal due to the cart state changing.
    }
  ),

  onAddToCart: actionOn(
    (actions) => actions.addToCart,
    (state) => {
      state.showAddToCart = true;
    }
  ),

  addToCart: action((state, payload) => {
    // we need this to keep track of the quantity on each product
    const cartProduct = state.cart.find((p) => p.id === payload.id);
    const productExists = state.cart.some((p) => p.id === payload.id);

    if (productExists) {
      const updatedProduct = {
        ...payload,
        quantity: (cartProduct.quantity += 1),
        total: payload.price * cartProduct.quantity,
      };
      // replace the product with the new quantity.
      const index = state.cart.findIndex((p) => p.id === payload.id);
      state.cart[index] = updatedProduct;
    } else {
      // save the first instance of the product in the cart
      state.cart.push({
        ...payload,
        quantity: 1,
        total: payload.price,
      });
    }
  }),

  // decrement the quantity, if 0 -> remove item
  decrementQuantity: action((state, payload) => {
    const cartProduct = state.cart.find((p) => p.id === payload);
    if (cartProduct.quantity === 0) {
      state.cart = removeProduct(state.cart, payload);
    }
    cartProduct.quantity -= 1;
  }),

  incrementQuantity: action((state, payload) => {
    const cartProduct = state.cart.find((p) => p.id === payload);
    cartProduct.quantity += 1;
  }),

  // remove item by ID entirely
  removeFromCart: action((state, payload) => {
    state.cart = removeProduct(state.cart, payload);
  }),
};
