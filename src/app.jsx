import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home.jsx";
import Catalogus from "./pages/catalogus.jsx";
import Forum from "./pages/forum.jsx";
import Header from "./components/header.jsx";

export default function App() {
  return (
    <section className="app">
      <Header />
      <section className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogus" element={<Catalogus />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </section>
    </section>
  )
}
