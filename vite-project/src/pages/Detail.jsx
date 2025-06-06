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
        setPhone(res.data.smartphone || res.data);
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
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      <h1 className="mb-4 text-center">
        <i className="fa-solid fa-mobile-screen-button me-2 text-info"></i>
        {phone.title}
      </h1>

      {phone.image && (
        <img
          src={`public/image/${phone.image}`}
          alt={phone.title}
          className="img-fluid rounded mb-4 shadow-sm"
          style={{ width: "100%" }}
        />
      )}

      <ul
        className="list-unstyled"
        style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}
      >
        <li>
          <i className="fa-solid fa-tags me-2 text-secondary"></i>
          <strong>Category:</strong> {phone.category || "N/A"}
        </li>
        <li>
          <i className="fa-solid fa-industry me-2 text-secondary"></i>
          <strong>Brand:</strong> {phone.brand || "N/A"}
        </li>
        <li>
          <i className="fa-solid fa-dollar-sign me-2 text-secondary"></i>
          <strong>Price:</strong>{" "}
          {phone.price !== undefined ? `$${phone.price}` : "N/A"}
        </li>
        <li>
          <i className="fa-solid fa-calendar-alt me-2 text-secondary"></i>
          <strong>Release Year:</strong> {phone.releaseYear || "N/A"}
        </li>
        <li>
          <i className="fa-solid fa-display me-2 text-secondary"></i>
          <strong>Screen Size:</strong>{" "}
          {phone.screenSize ? `${phone.screenSize} inches` : "N/A"}
        </li>
        <li>
          <i className="fa-solid fa-hard-drive me-2 text-secondary"></i>
          <strong>Storage:</strong> {phone.storage || "N/A"}
        </li>
        <li>
          <i className="fa-solid fa-memory me-2 text-secondary"></i>
          <strong>RAM:</strong> {phone.ram || "N/A"}
        </li>
        <li>
          <i className="fa-solid fa-battery-full me-2 text-secondary"></i>
          <strong>Battery:</strong> {phone.battery || "N/A"}
        </li>
        <li>
          <i className="fa-solid fa-camera me-2 text-secondary"></i>
          <strong>Camera:</strong> {phone.camera || "N/A"}
        </li>
        <li>
          <i className="fa-solid fa-weight-scale me-2 text-secondary"></i>
          <strong>Weight:</strong>{" "}
          {phone.weight ? `${phone.weight} grams` : "N/A"}
        </li>
        <li>
          <i className="fa-solid fa-align-left me-2 text-secondary"></i>
          <strong>Description:</strong> {phone.description || "N/A"}
        </li>
      </ul>
    </div>
  );
}
