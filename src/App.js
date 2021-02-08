import styled from "styled-components";
import { StoreProvider, createStore } from "easy-peasy";
import Router from "./router/index";

import model from "./model";

const store = createStore(model);

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const App = () => {
  return (
    <StoreProvider store={store}>
      <AppContainer>
        <Router />
      </AppContainer>
    </StoreProvider>
  );
};

export default App;
