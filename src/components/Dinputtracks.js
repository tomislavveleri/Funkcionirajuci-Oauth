"use client";
import { useState } from "react";
import axios from "axios";
import styles from "./Dinputbikes.module.css";

export default function Dinputtracks() {
  const [track, setTrack] = useState({
    trackName: "",
    trackDescription: "",
    trackGrade: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setTrack({ ...track, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/tracks", track);

      setMessage(response.track.message); // "Track registered successfully"
      setTrack({
        trackName: "",
        trackDescription: "",
        trackGrade: "",
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
        <h2>Enter Track</h2>
        {Object.keys(track).map((key) => (
          <div key={key}>
            <input
              className={styles.inputField}
              placeholder={key}
              value={track[key]}
              name={key}
              onChange={handleChange}
              type="text"
            ></input>
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>
          Enter
        </button>
      </form>
    </div>
  );
}
