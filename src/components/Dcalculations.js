"use client";
import { useState, useEffect } from "react";
export default function Dcalculations() {
  const [results, setResults] = useState([]);

  const [comparedTrack, setComparedTrack] = useState("");
  const [slowTime, setSlowTime] = useState("");
  const [fastTime, setFastTime] = useState("");
  const [fastSetup, setFastSetup] = useState("");
  const [slowSetup, setSlowSetup] = useState("");
  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch("/api/results");
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("bum", error);
      }
    }
    fetchResults();
  }, []);
  const handleCompare = (e) => {
    const track = e.target.value;
    setComparedTrack(track);

    const trackResults = results.filter(
      (result) => result.selectedTrack === track
    );
    if (trackResults.length > 0) {
      const times = trackResults.map((result) => parseFloat(result.trackTime));

      const fastTime = Math.min(...times);
      const slowTime = Math.max(...times);

      const fastSetup =
        trackResults.find((result) => parseFloat(result.trackTime) === fastTime)
          ?.selectedSetup || "N/A";

      const slowSetup =
        trackResults.find((result) => parseFloat(result.trackTime) === slowTime)
          ?.selectedSetup || "N/A";
      console.log(slowSetup);
      setFastTime(fastTime);
      setSlowTime(slowTime);
      setFastSetup(fastSetup);
      setSlowSetup(slowSetup);
    } else {
      setFastTime("N/A");
      setSlowTime("N/A");
    }
  };
  const uniqueTracks = [
    ...new Set(results.map((result) => result.selectedTrack)),
  ];
  return (
    <div>
      <select name="selectedTrack" onChange={handleCompare}>
        <option value="">Select Track</option>
        {uniqueTracks.map((track) => (
          <option key={track} value={track}>
            {track}
          </option>
        ))}
      </select>
      <p>
        For Track {comparedTrack || "N/A"}, best time is {fastTime} with{" "}
        {fastSetup} .
      </p>
      <p>
        For Track {comparedTrack || "N/A"}, worst time is {slowTime} with{" "}
        {slowSetup} .
      </p>
    </div>
  );
}
