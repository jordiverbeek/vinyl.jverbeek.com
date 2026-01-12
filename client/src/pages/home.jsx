import { useEffect, useState } from "react";

export default function Home() {
  const [cards, setCards] = useState([
    { id: 1, name: "Album 1", img: null },
    { id: 2, name: "Album 2", img: null },
    { id: 3, name: "Album 3", img: null },
  ]);

  return (
    <section className="home">
      <section className="hero">

      </section>
      <div className="button-wrapper">
        <button className="cta-button">
          catalogus →
        </button>
      </div>

      <section className="cards">
        {cards.map((c) => (
          <div key={c?.id} className="card">
            {c?.img ? <img src={c.img} alt="" /> : <p>(image)</p>}
            <div className="card-title">{c.name}</div>
          </div>
        ))}
      </section>
    </section>
  );
}
