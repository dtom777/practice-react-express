import React from "react";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/update" element={<Update />} />
    </Routes>
  );
};

export default App;
