import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Components/Home";
import AddUser from "./Components/AddUser";
import FetchUser from "./Components/FetchUser";
import Details from "./Components/Details";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/fetchuser" element={<FetchUser />} />
          <Route path="/details/:userId" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
