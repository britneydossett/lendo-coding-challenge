import { BrowserRouter, Switch, Route } from "react-router-dom";
import List from "../components/List";
import Details from "../components/Details";
import Cart from "../components/Cart";
import Header from "../components/Header";

const routes = [
  {
    path: "/",
    component: List,
  },
  {
    path: "/product/:id",
    component: Details,
  },
  {
    path: "/cart",
    component: Cart,
  },
];

export default function Router() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          {routes.map((route, i) => (
            <Route
              key={i}
              exact
              path={route.path}
              render={(props) => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
              )}
            />
          ))}
        </Switch>
      </div>
    </BrowserRouter>
  );
}
