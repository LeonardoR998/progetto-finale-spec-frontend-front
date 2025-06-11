import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { headingStyle, subheadingStyle, cardStyle } from "../styles";
import { getImageForTitle } from "../utils/imageMap";

export default function Detail() {
  const { id } = useParams();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/smartphones/${id}`)
      .then((res) => {
        setPhone(res.data.smartphone || res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Errore durante il caricamento dei dati.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5">Caricamento...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;
  if (!phone) return <div className="text-center mt-5">Dati non trovati</div>;

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div
        className="card shadow-lg border-0 bg-light p-4"
        style={{ ...cardStyle, maxWidth: "700px", width: "100%" }}
      >
        <h1 className="text-center mb-4" style={headingStyle}>
          {phone.title}
        </h1>

        <h5 className="text-center mb-3" style={subheadingStyle}>
          Tutti i dettagli tecnici del dispositivo
        </h5>

        <img
          src={getImageForTitle(phone.title)}
          alt={phone.title}
          className="img-fluid rounded mb-4"
          style={{
            objectFit: "cover",
            height: "500px",
            width: "100%",
            borderRadius: "8px",
          }}
        />

        <ul
          className="list-unstyled fs-6 text-dark"
          style={{ lineHeight: "1.7" }}
        >
          <li>
            <i className="fa-solid fa-tags me-2 text-primary"></i>
            <strong>Categoria:</strong> {phone.category || "N/A"}
          </li>
          <li>
            <i className="fa-solid fa-industry me-2 text-secondary"></i>
            <strong>Marca:</strong> {phone.brand || "N/A"}
          </li>
          <li>
            <i className="fa-solid fa-dollar-sign me-2 text-success"></i>
            <strong>Prezzo:</strong> {phone.price ? `$${phone.price}` : "N/A"}
          </li>
          <li>
            <i className="fa-solid fa-calendar me-2 text-info"></i>
            <strong>Anno di uscita:</strong> {phone.releaseYear || "N/A"}
          </li>
          <li>
            <i className="fa-solid fa-mobile-screen-button me-2 text-dark"></i>
            <strong>Display:</strong>{" "}
            {phone.screenSize ? `${phone.screenSize} pollici` : "N/A"}
          </li>
          <li>
            <i className="fa-solid fa-database me-2 text-warning"></i>
            <strong>Memoria:</strong> {phone.storage || "N/A"}
          </li>
          <li>
            <i className="fa-solid fa-memory me-2 text-danger"></i>
            <strong>RAM:</strong> {phone.ram || "N/A"}
          </li>
          <li>
            <i className="fa-solid fa-battery-full me-2 text-success"></i>
            <strong>Batteria:</strong> {phone.battery || "N/A"}
          </li>
          <li>
            <i className="fa-solid fa-camera me-2 text-secondary"></i>
            <strong>Fotocamera:</strong> {phone.camera || "N/A"}
          </li>
          <li>
            <i className="fa-solid fa-weight-hanging me-2 text-dark"></i>
            <strong>Peso:</strong> {phone.weight ? `${phone.weight}g` : "N/A"}
          </li>
          <li>
            <i className="fa-solid fa-align-left me-2 text-muted"></i>
            <strong>Descrizione:</strong>{" "}
            {phone.description || "Nessuna descrizione disponibile."}
          </li>
        </ul>
      </div>
    </div>
  );
}
