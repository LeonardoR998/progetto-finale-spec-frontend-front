import { useContext } from "react";
import { CompareContext } from "../contexts/CompareContext";
import { getImageForTitle } from "../utils/imageMap";
import {
  headingStyle,
  cardStyle,
  cardTitleStyle,
  cardTextStyle,
} from "../styles";

export default function Compare() {
  const { compareList, removeFromCompare } = useContext(CompareContext);

  if (compareList.length === 0)
    return (
      <div
        className="container mt-4"
        style={{ fontFamily: "Segoe UI, sans-serif", minHeight: "100vh" }}
      >
        <h1 className="mb-4" style={headingStyle}>
          Confronta Smartphone
        </h1>
        <p className="text-center text-muted">
          Nessuno smartphone selezionato per il confronto.
        </p>
      </div>
    );

  return (
    <div
      className="container mt-4"
      style={{ fontFamily: "Segoe UI, sans-serif", minHeight: "100vh" }}
    >
      <h1 className="mb-4" style={headingStyle}>
        Confronta Smartphone
      </h1>
      <div className="d-flex justify-content-center gap-4 flex-wrap">
        {compareList.map((phone) => (
          <div
            key={phone.id}
            className="card shadow border-0"
            style={{ ...cardStyle, width: "300px", minHeight: "450px" }}
          >
            <img
              src={getImageForTitle(phone.title)}
              className="card-img-top"
              alt={phone.title}
              style={{ objectFit: "cover", height: "200px" }}
            />

            <div className="card-body d-flex flex-column">
              <h5 style={cardTitleStyle}>{phone.title}</h5>
              <p style={cardTextStyle}>Categoria: {phone.category}</p>
              <p className="card-text flex-grow-1">
                {phone.description || "-"}
              </p>
              <p className="text-center fw-bold">
                Prezzo: {phone.price || "-"}
              </p>
              <p className="text-center fw-bold">
                Memoria: {phone.storage || "-"}
              </p>
              <p className="text-center fw-bold">RAM: {phone.ram || "-"}</p>
              <p className="text-center fw-bold">
                Batteria: {phone.battery || "-"}
              </p>
              <p className="text-center fw-bold">
                Fotocamera: {phone.camera || "-"}
              </p>
              <button
                className="btn btn-danger btn-sm mt-auto"
                onClick={() => removeFromCompare(phone.id)}
              >
                Rimuovi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
