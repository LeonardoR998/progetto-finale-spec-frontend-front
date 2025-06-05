import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext";

export default function Home() {
  const [phones, setPhones] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const { addToFavorites, removeFromFavorites, isFavorite } =
    useContext(FavoritesContext);

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

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Smartphones</h1>

      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Cerca per titolo..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
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
        <div className="col-md-2">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Ordina per Titolo</option>
            <option value="category">Ordina per Categoria</option>
          </select>
        </div>
        <div className="col-md-2">
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

      <ul className="list-group">
        {phones.map((phone) => (
          <li
            key={phone.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{phone.title}</strong> — {phone.category}
            </div>
            <div className="btn-group">
              <Link
                to={`/detail/${phone.id}`}
                className="btn btn-primary btn-sm"
              >
                Dettagli
              </Link>
              {isFavorite(phone.id) ? (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => removeFromFavorites(phone.id)}
                >
                  ★
                </button>
              ) : (
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => addToFavorites(phone)}
                >
                  ☆
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
