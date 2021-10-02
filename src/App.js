import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import Results from "./results";
import Details from './details';
import React, { useState, useEffect } from "react";
function App() {
  return (
    <div>
      <h1>Vaccine deals</h1>
      <Home />
      <Results />
      <Details />
    </div>
  );
}

export default App;
