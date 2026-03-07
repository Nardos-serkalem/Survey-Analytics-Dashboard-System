
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
function App() {
  

  return (
    <BrowserRouter>
      
      <Header />
      <Navbar />
    </BrowserRouter>
  );
}

export default App;