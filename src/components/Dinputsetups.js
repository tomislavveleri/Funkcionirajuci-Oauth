"use client";
import { useState } from "react";
import axios from "axios";
import styles from "./Dinputbikes.module.css";
export default function Dinputsetups() {
  const [setup, setSetup] = useState({
    setupName: "",
    frontTyrePressure: "",
    forkPressure: "",
    hsrf: "",
    lsrf: "",
    hscf: "",
    lscf: "",
    tokenNumberf: "",
    sagf: "",
    rearTyrePressure: "",
    shockPressure: "",
    hsrr: "",
    lsrr: "",
    hscr: "",
    lscr: "",
    tokenNumberr: "",
    sagr: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setSetup({ ...setup, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post("api/setups", setup);
      setMessage(response.setup.message);
      setSetup({
        setupName: "",
        frontTyrePressure: "",
        forkPressure: "",
        hsrf: "",
        lsrf: "",
        hscf: "",
        lscf: "",
        tokenNumberf: "",
        sagf: "",
        rearTyrePressure: "",
        shockPressure: "",
        hsrr: "",
        lsrr: "",
        hscr: "",
        lscr: "",
        tokenNumberr: "",
        sagr: "",
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
        <h2>Enter setup</h2>
        {Object.keys(setup).map((key) => (
          <div key={key}>
            <input
              className={styles.inputField}
              placeholder={key}
              type="text"
              name={key}
              value={setup[key]}
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
