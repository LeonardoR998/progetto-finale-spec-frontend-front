import { useContext } from "react";
import { CompareContext } from "../contexts/CompareContext";

export default function Compare() {
  const { compareList, clearCompare, removeFromCompare } =
    useContext(CompareContext);

  if (compareList.length === 0)
    return (
      <div className="container mt-4 text-center">
        <i className="fa-solid fa-circle-info fa-2x text-secondary mb-3"></i>
        <p>Nessun elemento da confrontare.</p>
      </div>
    );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        <i className="fa-solid fa-scale-balanced me-2 text-primary"></i>
        Confronta Smartphones
      </h2>
      <button className="btn btn-danger mb-4" onClick={clearCompare}>
        <i className="fa-solid fa-trash me-2"></i>Svuota confronto
      </button>

      <div className="row">
        {compareList.map((phone) => (
          <div className="col-md-6" key={phone.id}>
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fa-solid fa-mobile-screen-button me-2 text-info"></i>
                  {phone.title || "N/A"}
                </h5>
                <ul className="list-unstyled mt-3">
                  <li>
                    <i className="fa-solid fa-tags me-2 text-secondary"></i>
                    <strong>Categoria:</strong> {phone.category || "N/A"}
                  </li>
                  <li>
                    <i className="fa-solid fa-industry me-2 text-secondary"></i>
                    <strong>Brand:</strong> {phone.brand || "N/A"}
                  </li>
                  <li>
                    <i className="fa-solid fa-dollar-sign me-2 text-secondary"></i>
                    <strong>Prezzo:</strong>{" "}
                    {phone.price !== undefined ? `$${phone.price}` : "N/A"}
                  </li>
                  <li>
                    <i className="fa-solid fa-memory me-2 text-secondary"></i>
                    <strong>RAM:</strong> {phone.ram || "N/A"}
                  </li>
                  <li>
                    <i className="fa-solid fa-hard-drive me-2 text-secondary"></i>
                    <strong>Storage:</strong> {phone.storage || "N/A"}
                  </li>
                  <li>
                    <i className="fa-solid fa-battery-full me-2 text-secondary"></i>
                    <strong>Batteria:</strong> {phone.battery || "N/A"}
                  </li>
                </ul>
                <button
                  className="btn btn-outline-danger btn-sm mt-3"
                  onClick={() => removeFromCompare(phone.id)}
                >
                  <i className="fa-solid fa-xmark me-1"></i>Rimuovi dal
                  confronto
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
