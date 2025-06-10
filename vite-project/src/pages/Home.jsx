// Home.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { CompareContext } from "../contexts/CompareContext";
import ModernButton from "../components/ModernButton";
import {
  headingStyle,
  subheadingStyle,
  cardStyle,
  cardTitleStyle,
  cardTextStyle,
} from "../styles";

export default function Home() {
  const [phones, setPhones] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

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
    <div
      className="container mt-4"
      style={{ fontFamily: "Segoe UI, sans-serif", minHeight: "100vh" }}
    >
      <h1 className="mb-4" style={headingStyle}>
        Smartphones
      </h1>
      <h2 style={subheadingStyle}>
        Filtra e confronta i tuoi modelli preferiti
      </h2>

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
      <div className="row justify-content-center">
        {phones.map((phone) => (
          <div
            key={phone.id}
            className="col-md-4 mb-4 d-flex align-items-stretch"
          >
            <div className="card h-100 shadow-sm border-0" style={cardStyle}>
              {phone.image && (
                <img
                  src={`/img/${phone.image}`}
                  className="card-img-top"
                  alt={phone.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 style={cardTitleStyle}>{phone.title}</h5>
                <p style={cardTextStyle}>Categoria: {phone.category}</p>
                <div className="mt-auto d-flex flex-wrap justify-content-center gap-2">
                  <ModernButton onClick={() => navigate(`/detail/${phone.id}`)}>
                    Dettagli
                  </ModernButton>

                  <ModernButton
                    onClick={() =>
                      isFavorite(phone.id)
                        ? removeFromFavorites(phone.id)
                        : addToFavorites(phone)
                    }
                    primary={isFavorite(phone.id)}
                    title="Preferito"
                  >
                    {isFavorite(phone.id) ? "★" : "☆"}
                  </ModernButton>

                  <ModernButton
                    onClick={() => handleCompareClick(phone)}
                    primary={isInCompare(phone.id)}
                    disabled={!isInCompare(phone.id) && compareList.length >= 2}
                    title={
                      compareList.length >= 2 && !isInCompare(phone.id)
                        ? "Puoi confrontare solo 2 elementi"
                        : ""
                    }
                  >
                    {isInCompare(phone.id) ? "Rimuovi" : "Confronta"}
                  </ModernButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
