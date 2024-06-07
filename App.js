import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";

import Details from "./components/Details";
import BasicModal from "./components/CartModal";
import Login from "./components/Login";
import LoginModal from "./components/Loginmodal";
import MyComponent from "./components/Api";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <BasicModal />
        <LoginModal/>

        <Routes>
        <Route path="/" element={<MyComponent />} />
        <Route path="/login" element={<Login />} />
          {/* <Route path="/dialog" element={<Dialog />}></Route> */}
          <Route path="/details/:id" element={<Details />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
