import { createMemoryHistory } from "history";
import { createStore, StoreProvider } from "easy-peasy";
import { Router, Route } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import Details from "../../src/components/Details";
import model from "../../src/model";

describe("Details", () => {
  const store = createStore(model, {
    initialState: {
      localOptions: {
        color: "blue",
        quantity: 1,
      },
    },
  });
  const renderWithRouterMatch = (
    ui,
    { path = "/", route = "/", history = createMemoryHistory({ initialEntries: [route] }) } = {}
  ) => {
    return {
      ...render(
        <StoreProvider store={store}>
          <Router history={history}>
            <Route path={path} component={ui} />
          </Router>
        </StoreProvider>
      ),
    };
  };

  test("Details for product based off route", () => {
    const { getByTestId } = renderWithRouterMatch(Details, {
      route: "/product/1",
      path: "/product/:id",
    });
    expect(getByTestId("details").textContent).toEqual("Name: Philips hue bulb");
  });

  test("Add to Cart", () => {
    const { getByRole } = renderWithRouterMatch(Details, {
      route: "/product/1",
      path: "/product/:id",
    });

    fireEvent.click(getByRole("button", { name: "white" }));

    fireEvent.click(getByRole("button", { name: "Add To Cart" }));
    expect(store.getState().cart).toHaveLength(1);
  });
});
