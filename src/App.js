import React from "react";
import "./App.css";
//import redux
import { Provider } from "react-redux";
import { configureStore } from "./redux/configureStore";
//import main component
import Main from "./components/pages/main";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
