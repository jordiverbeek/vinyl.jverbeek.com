import React, { useState } from "react";
import data from "../../data.json";
import CatalogusItem from "../components/catalogus-item";

const Catalogus = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);

  const categories = [...new Set(data.albums.map(a => a.categorie))];
  const artists = [...new Set(data.albums.map(a => a.artist))];

  const toggleCategory = (categorie) => {
    setSelectedCategories(prev =>
      prev.includes(categorie)
        ? prev.filter(c => c !== categorie)
        : [...prev, categorie]
    );
  };

  const toggleArtist = (artist) => {
    setSelectedArtists(prev =>
      prev.includes(artist)
        ? prev.filter(a => a !== artist)
        : [...prev, artist]
    );
  };

  const filteredAlbums = data.albums.filter(album => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(album.categorie);

    const artistMatch =
      selectedArtists.length === 0 ||
      selectedArtists.includes(album.artist);

    return categoryMatch && artistMatch;
  });

  return (
    <section className="catalogus">
      <div className="sidebar">
        <h3>Filters</h3>

        <p><strong>Categorieën</strong></p>
        {categories.map(categorie => (
          <label key={categorie}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(categorie)}
              onChange={() => toggleCategory(categorie)}
            />
            {categorie}
          </label>
        ))}

        <p><strong>Artiesten</strong></p>
        {artists.map(artist => (
          <label key={artist}>
            <input
              type="checkbox"
              checked={selectedArtists.includes(artist)}
              onChange={() => toggleArtist(artist)}
            />
            {artist}
          </label>
        ))}
      </div>

      <div className="items">
        {filteredAlbums.map(album => (
          <CatalogusItem key={album.id} album={album} />
        ))}
      </div>
    </section>
  );
};

export default Catalogus;
