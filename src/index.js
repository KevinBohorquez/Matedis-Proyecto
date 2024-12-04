import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Chatbot from "./Chatbot";
import Tiendas from "./Tiendas";
import VendingMachine from "./VendingMachine";

function App() {
    return (
        <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<VendingMachine />} />
            <Route path="/Chatbot" element={<Chatbot />} />
            <Route path="/Tiendas" element={<Tiendas />} />
        </Routes>
        </Router>
    );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
