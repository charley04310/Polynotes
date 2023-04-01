import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import PolynoteRouter from "./router/router";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PolynoteRouter />
    </Provider>
  );
};

export default App;
