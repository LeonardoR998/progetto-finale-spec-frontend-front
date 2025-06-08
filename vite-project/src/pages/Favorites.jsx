import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <i className="fa-solid fa-heart-crack fa-2x text-danger mb-3"></i>
        <p>Nessun preferito al momento.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">
        <i className="fa-solid fa-heart text-danger me-2"></i>I tuoi preferiti
      </h2>
      <div className="row">
        {favorites.map((phone) => (
          <div key={phone.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              {phone.image && (
                <img
                  src={`public/image/${phone.image}`}
                  className="card-img-top"
                  alt={phone.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{phone.title}</h5>
                <p className="card-text text-muted mb-2">
                  Categoria: {phone.category}
                </p>
                <div className="mt-auto d-flex flex-wrap gap-2">
                  <Link
                    to={`/detail/${phone.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Dettagli
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromFavorites(phone.id)}
                  >
                    Rimuovi
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
