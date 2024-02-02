import React from "react";
import { Routes, Route, Link } from "react-router-dom"; // Replace Switch with Routes
import { Layout } from "antd";
// import "antd/dist/antd.css";
import { Navbar, Homepage } from "./components/index.tsx";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      {/* main section */}
      <div className="main">
        <Layout>
          {/* left section */}
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} /> {/* Use element prop instead */}
              {/* <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} /> */}
            </Routes>
          </div>
          {/* right section */}
          <div className="routes">
            {/* You can optionally put Routes here if you have right section routes */}
            <Routes>
              {/* <Route path="/news" element={<News />} /> */}
            </Routes>
          </div>
        </Layout>
      </div>
      <div className="footer"></div>
    </div>
  );
};
export default App;