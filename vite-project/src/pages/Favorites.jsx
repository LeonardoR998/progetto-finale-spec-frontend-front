import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext";

export default function Favorites() {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  return (
    <div
      className="container mt-4"
      style={{ fontFamily: "Segoe UI, sans-serif", minHeight: "100vh" }}
    >
      <h1 className="mb-4 text-center text-dark">Preferiti</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-muted">
          Nessun smartphone nei preferiti.
        </p>
      ) : (
        <div className="row justify-content-center">
          {favorites.map((phone) => (
            <div
              key={phone.id}
              className="col-md-4 mb-4 d-flex align-items-stretch"
            >
              <div
                className="card h-100 shadow-sm border-0"
                style={{ backgroundColor: "#f8f8f8", color: "#000" }}
              >
                {phone.image && (
                  <img
                    src={`/img/${phone.image}`}
                    className="card-img-top"
                    alt={phone.title}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center text-dark">
                    {phone.title}
                  </h5>
                  <p className="card-text text-muted mb-2 text-center">
                    Categoria: {phone.category}
                  </p>
                  <div className="mt-auto d-flex justify-content-center">
                    <Link
                      to={`/detail/${phone.id}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Dettagli
                    </Link>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => removeFromFavorites(phone.id)}
                      title="Rimuovi dai preferiti"
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
