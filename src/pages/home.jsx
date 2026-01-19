import { useState } from "react";
import data from "../../data.json";
import { Link } from "react-router-dom";

export default function Home() {
  const [cards] = useState(data.albums.slice(0, 3));

  return (
    <section className="home">
      <section className="hero">
        <h1>Welkom bij Vinyl</h1>
        <p>Ontdek nieuwe platen en de community</p>
      </section>

      <div className="button-wrapper">
        <Link to="/catalogus" className='cta-button'>catalogus →</Link>
      </div>

      <section className="cards">
        {cards.map((album) => (
         
           <div className="catalogus-item">
                <img src={album?.image || fallbackImage} alt={album.title} />
                <div className="item-info">
                  <h4>{album.title}</h4>
                  <p>{album.artist}</p>
                </div>
              </div>
        ))}
      </section>
    </section>
  );
}
