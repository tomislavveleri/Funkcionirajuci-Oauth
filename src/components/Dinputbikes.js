"use client";

//originalno kao iz aplikacije

import { useState } from "react";
import styles from "./Dinputbikes.module.css";
export default function Dinputbikes() {
  const [bike, setBike] = useState({
    naziv: "",
    model: "",
    godiste: "",
    infoKomponente: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setBike({ ...bike, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/bikes", bike);
      setBike({ naziv: "", model: "", godiste: "", infoKomponente: "" });
      setMessage(response.bike.message); // "Bike registered successfully"
      setBike({
        naziv: "",
        model: "",
        godiste: "",
        infoKomponente: "",
      });
    } catch (err) {
      err.response?.data?.error || "Something went wrong. Please try again.";
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.dataResults}>
      <form onSubmit={handleSubmit}>
        <h2>Enter a bike</h2>
        {Object.keys(bike).map((key) => (
          <div key={key}>
            <input
              className={styles.inputField}
              type="text"
              placeholder={key}
              name={key}
              value={bike[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>
          Enter
        </button>
      </form>
    </div>
  );
}
