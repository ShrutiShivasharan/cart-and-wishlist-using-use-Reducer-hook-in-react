import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductComponent from "./components/ProductComponent";
import Wishlist from './components/Wishlist'
import Cart from './components/Cart'
import { Context, initialState, Reducer } from "./reducer";
import { useReducer } from "react";

function App() {

  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <>
      <Context.Provider value={{ state, dispatch }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<ProductComponent />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </Context.Provider>
    </>
  );
}

export default App;
