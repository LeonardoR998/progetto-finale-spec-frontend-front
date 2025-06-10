import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  headingStyle,
  subheadingStyle,
  cardStyle,
  cardTitleStyle,
  cardTextStyle,
} from "../styles";

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

        {phone.image && (
          <img
            src={`/img/${phone.image}`}
            alt={phone.title}
            className="img-fluid rounded mb-4"
            style={{ objectFit: "cover", height: "300px", width: "100%" }}
          />
        )}

        <ul
          className="list-unstyled fs-6 text-dark"
          style={{ lineHeight: "1.7" }}
        >
          <li>
            <strong>Categoria:</strong> {phone.category || "N/A"}
          </li>
          <li>
            <strong>Marca:</strong> {phone.brand || "N/A"}
          </li>
          <li>
            <strong>Prezzo:</strong> {phone.price ? `$${phone.price}` : "N/A"}
          </li>
          <li>
            <strong>Anno di uscita:</strong> {phone.releaseYear || "N/A"}
          </li>
          <li>
            <strong>Display:</strong>{" "}
            {phone.screenSize ? `${phone.screenSize} pollici` : "N/A"}
          </li>
          <li>
            <strong>Memoria:</strong> {phone.storage || "N/A"}
          </li>
          <li>
            <strong>RAM:</strong> {phone.ram || "N/A"}
          </li>
          <li>
            <strong>Batteria:</strong> {phone.battery || "N/A"}
          </li>
          <li>
            <strong>Fotocamera:</strong> {phone.camera || "N/A"}
          </li>
          <li>
            <strong>Peso:</strong> {phone.weight ? `${phone.weight}g` : "N/A"}
          </li>
          <li>
            <strong>Descrizione:</strong>{" "}
            {phone.description || "Nessuna descrizione disponibile."}
          </li>
        </ul>
      </div>
    </div>
  );
}
