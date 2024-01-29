import React from "react";
import Books from "./Components/Books";
import Registration from "./Components/Registration";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/registrationform" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
