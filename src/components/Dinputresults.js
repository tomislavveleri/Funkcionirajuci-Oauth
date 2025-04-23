"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./Dinputbikes.module.css";
export default function Dinputresults() {
  const [bikes, setBikes] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [setups, setSetups] = useState([]);
  const [results, setResults] = useState({
    selectedBike: "",
    seletedTrack: "",
    selectedSetup: "",
    trackTime: "",
    trackConditions: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchAll() {
      try {
        const [bikesResponse, tracksResponse, setupsResponse] =
          await Promise.all([
            fetch("/api/bike"),
            fetch("/api/tracks"),
            fetch("api/setups"),
          ]);
        const dataBikes = await bikesResponse.json();
        const dataTracks = await tracksResponse.json();
        const dataSetups = await setupsResponse.json();
        setBikes(dataBikes);
        setTracks(dataTracks);
        setSetups(dataSetups);
      } catch (err) {
        console.err(err);
      }
    }
    fetchAll();
  }, []);
  const handleChange = (e) =>
    setResults({ ...results, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("api/results", results);
      setMessage(response.data.message);
      setResults({
        selectedBike: "",
        seletedTrack: "",
        selectedSetup: "",
        trackTime: "",
        trackConditions: "",
      });
    } catch (err) {
      console.error("error", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.dataResults}>
      <form onSubmit={handleSubmit}>
        <h2>Enter a Result</h2>
        <select
          className={styles.selectDropdown}
          name="selectedBike"
          onChange={handleChange}
        >
          <option value={results.selectedBike || ""}>Select a bike</option>
          {bikes.map((bike) => (
            <option key={bike.idBike} value={bike.bikeName}>
              {bike.bikeName}
            </option>
          ))}
        </select>
        <select
          name="selectedTrack"
          onChange={handleChange}
          className={styles.selectDropdown}
        >
          <option value={results.seletedTrack || ""}>Select Track</option>
          {tracks.map((track) => (
            <option key={track.idTrack} value={track.trackName}>
              {track.trackName}
            </option>
          ))}
        </select>
        <select
          name="selectedSetup"
          onChange={handleChange}
          className={styles.selectDropdown}
        >
          <option value={results.selectedSetup || ""}>Select Setup</option>
          {setups.map((setup) => (
            <option key={setup.idSetup} value={setup.setupName}>
              {setup.setupName}
            </option>
          ))}
        </select>
        <input
          className={styles.inputField}
          placeholder="Track Time"
          type="text"
          name="trackTime"
          value={results.trackTime || ""}
          onChange={handleChange}
        ></input>
        <input
          className={styles.inputField}
          placeholder="Track Conditions"
          type="text"
          name="trackConditions"
          value={results.trackConditions || ""}
          onChange={handleChange}
        ></input>
        <button type="submit" className={styles.submitButton}>
          Enter
        </button>
      </form>
    </div>
  );
}
