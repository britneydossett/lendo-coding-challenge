import "regenerator-runtime/runtime";
import { createStore } from "easy-peasy";
import model from "../../src/model";

describe("Store", () => {
  const cartObject1 = [
    {
      id: "11-blue",
      name: "Light Bulb",
      brand: "GE",
      weight: 1.6,
      price: 500,
      available: true,
      options: [
        {
          color: "blue",
          quantity: 2,
        },
      ],
    },
  ];

  const cartObject2 = {
    id: "11-green",
    name: "Light Bulb",
    brand: "GE",
    weight: 1.6,
    price: 500,
    available: true,
    options: [
      {
        color: "green",
        quantity: 3,
      },
    ],
  };

  const store = createStore(model, {
    initialState: {
      cart: cartObject1,
    },
  });

  const otherStore = createStore(model, {
    mockActions: true,
  });

  test("itemsInCartCount works", async () => {
    expect(store.getState().itemsInCartCount).toEqual(1);
  });

  test("Items in cart are accurate", async () => {
    expect(store.getState().cart).toEqual(cartObject1);
  });

  test("Tests listener, onCartUpdate, works when IncrementQuantity action fires", () => {
    otherStore.getActions().incrementQuantity(cartObject2);

    expect(otherStore.getMockedActions()).toMatchObject([
      {
        type: "@action.incrementQuantity",
        payload: cartObject2,
      },
      {
        type: "@actionOn.onCartUpdate",
        payload: {
          type: "@action.incrementQuantity",
          payload: cartObject2,
        },
      },
    ]);
  });
});
