import { createStore, StoreProvider } from "easy-peasy";
import { render, fireEvent } from "@testing-library/react";
import Cart from "../../src/components/Cart";
import model from "../../src/model";

describe("Cart", () => {
  const store = createStore(model);
  const app = (
    <StoreProvider store={store}>
      <Cart />
    </StoreProvider>
  );

  const cartObject1 = {
    id: "11-blue",
    name: "Light Bulb",
    brand: "GE",
    weight: 1.6,
    price: 500,
    available: true,
    options: ["blue", 2],
    quantity: 1,
    total: 500,
  };

  test("Cart total equals zero", () => {
    const { getByTestId } = render(app);
    expect(getByTestId("cart").textContent).toEqual("TOTAL: 0 SEK");
  });

  test("Increment Cart", () => {
    store.getState().cart.push(cartObject1);
    const { getByText } = render(app);

    fireEvent.click(getByText("+"));
    expect(store.getState().cart[0].total).toEqual(1000);
  });
});
