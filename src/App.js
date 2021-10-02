import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import results from "./results";
import details from './details';
import React, { useState, useEffect } from "react";
function App() {
  return (
    <div>
      <h1>Vaccine deals</h1>
      <Home />
    </div>
  );
}

export default App;
