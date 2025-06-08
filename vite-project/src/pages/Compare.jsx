import { useContext } from "react";
import { CompareContext } from "../contexts/CompareContext";

export default function Compare() {
  const { compareList, removeFromCompare } = useContext(CompareContext);

  if (compareList.length === 0)
    return (
      <div
        className="container mt-4"
        style={{ fontFamily: "Segoe UI, sans-serif", minHeight: "100vh" }}
      >
        <h1 className="mb-4 text-center text-dark">Confronta Smartphone</h1>
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
      <h1 className="mb-4 text-center text-dark">Confronta Smartphone</h1>

      <div className="d-flex justify-content-center gap-4 flex-wrap">
        {compareList.map((phone) => (
          <div
            key={phone.id}
            className="card shadow-sm border-0"
            style={{
              backgroundColor: "#f5f5f5",
              color: "#000",
              width: "300px",
              minHeight: "450px",
              display: "flex",
              flexDirection: "column",
            }}
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
              <p className="text-muted mb-2 text-center">
                Categoria: {phone.category}
              </p>
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
                title="Rimuovi dal confronto"
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
