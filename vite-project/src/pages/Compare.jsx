import { useContext } from "react";
import { CompareContext } from "../contexts/CompareContext";
import { getImageForTitle } from "../utils/imageMap";
import { headingStyle } from "../styles";

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

  const featureList = [
    { key: "price", label: "Prezzo" },
    { key: "storage", label: "Memoria" },
    { key: "ram", label: "RAM" },
    { key: "battery", label: "Batteria" },
    { key: "camera", label: "Fotocamera" },
  ];

  return (
    <div
      className="container mt-4"
      style={{
        fontFamily: "Segoe UI, sans-serif",
        minHeight: "100vh",
        color: "#111",
      }}
    >
      <h1 className="mb-5 mt-5" style={headingStyle}>
        Confronta Smartphone
      </h1>

      <div className="d-flex justify-content-center gap-4 flex-wrap mb-5">
        {compareList.map((phone) => (
          <div
            key={phone.id}
            className="glass-card text-center p-3"
            style={{
              width: "260px",
              borderRadius: "20px",
              backdropFilter: "blur(15px)",
              background: "rgba(255, 255, 255, 0.35)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
              color: "#111",
            }}
          >
            <img
              src={getImageForTitle(phone.title)}
              alt={phone.title}
              className="img-fluid rounded mb-3"
              style={{ height: "200px", objectFit: "cover", width: "100%" }}
            />
            <h5 className="fw-bold">{phone.title}</h5>
            <p className="text-muted mb-2">{phone.category}</p>
            <button
              className="btn btn-outline-danger btn-sm mt-2"
              onClick={() => removeFromCompare(phone.id)}
            >
              <i className="fa-solid fa-trash fa-lg"></i>
            </button>
          </div>
        ))}
      </div>

      {/* FEATURE COMPARISON */}
      <div className="row justify-content-center g-4">
        {featureList.map(({ key, label }) => (
          <div key={key} className="col-12">
            <h6
              className="text-center text-uppercase mb-3"
              style={{ ...headingStyle, fontSize: "1.1rem", color: "#111" }}
            >
              {label}
            </h6>
            <div className="d-flex justify-content-center gap-4 flex-wrap">
              {compareList.map((phone) => (
                <div
                  key={phone.id + key}
                  className="px-4 py-3 rounded text-center shadow-sm"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "16px",
                    color: "#111",
                    minWidth: "200px",
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    fontFamily: headingStyle.fontFamily,
                    letterSpacing: "0.3px",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {phone[key] || "-"}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
