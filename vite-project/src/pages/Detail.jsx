import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        setPhone(res.data.smartphone || res.data); // Adatta se la risposta ha smartphone dentro
        setLoading(false);
      })
      .catch(() => {
        setError("Error loading data");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!phone) return <div>No data found</div>;

  return (
    <div
      className="container mt-4"
      style={{
        maxWidth: "600px",
        margin: "auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        {phone.title}
      </h1>
      {phone.image && (
        <img
          src={`public/image/${phone.image}`}
          alt={phone.title}
          style={{
            width: "100%",
            borderRadius: "12px",
            marginBottom: "25px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />
      )}
      <div style={{ lineHeight: "1.6", fontSize: "16px", color: "#333" }}>
        <p>
          <strong>Category:</strong> {phone.category}
        </p>
        <p>
          <strong>Brand:</strong> {phone.brand}
        </p>
        <p>
          <strong>Price:</strong> ${phone.price}
        </p>
        <p>
          <strong>Release Year:</strong> {phone.releaseYear}
        </p>
        <p>
          <strong>Screen Size:</strong> {phone.screenSize} inches
        </p>
        <p>
          <strong>Storage:</strong> {phone.storage}
        </p>
        <p>
          <strong>RAM:</strong> {phone.ram}
        </p>
        <p>
          <strong>Battery:</strong> {phone.battery}
        </p>
        <p>
          <strong>Camera:</strong> {phone.camera}
        </p>
        <p>
          <strong>Weight:</strong> {phone.weight} grams
        </p>
        <p>
          <strong>Description:</strong> {phone.description}
        </p>
      </div>
    </div>
  );
}
