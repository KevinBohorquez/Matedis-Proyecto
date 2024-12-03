import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import About from "./About";
import Blog from "./Blog"
import Tiendas from "./Tiendas";

function App() {
    return (
        <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/Tiendas" element={<Tiendas />} />
        </Routes>
        </Router>
    );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
