import React from "react";
import data from "../../data.json";
import CatalogusItem from "../components/catalogus-item";

const Catalogus = () => {
  return (
    <section className="catalogus">
      <div className="sidebar">
        <h3>Filters</h3>
        <p>Genres</p>
        
        <p>Artiesten</p>
      </div>

      <div className="items">
        {data.albums.map((album) => (
          <CatalogusItem key={album.id} album={album} />
        ))}
      </div>
    </section>
  );
};

export default Catalogus;
