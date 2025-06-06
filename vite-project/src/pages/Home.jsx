import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { CompareContext } from "../contexts/CompareContext";

export default function Home() {
  const [phones, setPhones] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const { addToFavorites, removeFromFavorites, isFavorite } =
    useContext(FavoritesContext);
  const { compareList, addToCompare, removeFromCompare, isInCompare } =
    useContext(CompareContext);

  useEffect(() => {
    let url = "http://localhost:3001/smartphones";
    const query = [];
    if (search) query.push(`search=${search}`);
    if (category) query.push(`category=${category}`);
    if (query.length) url += "?" + query.join("&");

    axios.get(url).then((res) => {
      let sorted = [...res.data];
      sorted.sort((a, b) => {
        const valA = a[sortBy].toLowerCase();
        const valB = b[sortBy].toLowerCase();
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
      setPhones(sorted);
    });
  }, [search, category, sortBy, sortOrder]);

  const uniqueCategories = [...new Set(phones.map((p) => p.category))];

  const handleCompareClick = async (phone) => {
    if (isInCompare(phone.id)) {
      removeFromCompare(phone.id);
      return;
    }
    if (compareList.length >= 2) return;

    try {
      const res = await axios.get(
        `http://localhost:3001/smartphones/${phone.id}`
      );
      const fullPhone = res.data.smartphone || res.data;
      addToCompare(fullPhone);
    } catch (error) {
      console.error("Errore fetch dettagli telefono:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Smartphones</h1>

      {/* FILTRI */}
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            placeholder="Cerca per titolo..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Tutte le categorie</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2 mb-2">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Ordina per Titolo</option>
            <option value="category">Ordina per Categoria</option>
          </select>
        </div>
        <div className="col-md-2 mb-2">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      {/* CARD LIST */}
      <div className="row">
        {phones.map((phone) => (
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
                    className={`btn btn-sm ${
                      isFavorite(phone.id)
                        ? "btn-warning"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() =>
                      isFavorite(phone.id)
                        ? removeFromFavorites(phone.id)
                        : addToFavorites(phone)
                    }
                    title="Preferito"
                  >
                    {isFavorite(phone.id) ? "★" : "☆"}
                  </button>

                  <button
                    className={`btn btn-sm ${
                      isInCompare(phone.id)
                        ? "btn-danger"
                        : "btn-outline-success"
                    }`}
                    onClick={() => handleCompareClick(phone)}
                    disabled={!isInCompare(phone.id) && compareList.length >= 2}
                    title={
                      compareList.length >= 2 && !isInCompare(phone.id)
                        ? "Puoi confrontare solo 2 elementi"
                        : ""
                    }
                  >
                    {isInCompare(phone.id) ? "Rimuovi" : "Confronta"}
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
