import { fallbackImage } from '../imports/assets';

const CatalogusItem = ({ album }) => {
  return (
    <div className="catalogus-item">
      <img src={album?.image || fallbackImage} alt={album.title} />
      <div className="item-info">
        <h4>{album.title}</h4>
        <p>{album.artist}</p>
      </div>
    </div>
  );
};

export default CatalogusItem;
