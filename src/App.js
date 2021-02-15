import styled from "styled-components";
import { StoreProvider, createStore } from "easy-peasy";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";

import model from "./model";
import Header from "./components/Header";
import Toast from "./components/Toast";
import List from "./components/List";
import Details from "./components/Details";
import Cart from "./components/Cart";

const store = createStore(model);

const AppContainer = styled.div`
  display: grid;
  grid-template-rows: 60px auto;
`;

const App = () => {
  return (
    <StoreProvider store={store}>
      <GlobalStyle />
      <AppContainer>
        <Router>
          <Header />
          <Toast />
          <Switch>
            <Route exact path="/" component={List} />
            <Route path="/product/:id" component={Details} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </Router>
      </AppContainer>
    </StoreProvider>
  );
};

export default App;
