import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

import Home from "./pages/home.jsx";

export default function App() {
  const [cards, setCards] = useState([
    { id: 1, name: "Album 1", img: null },
    { id: 2, name: "Album 2", img: null },
    { id: 3, name: "Album 3", img: null },
  ]);

  return (
    <section className="app">
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </section>
  )
}
