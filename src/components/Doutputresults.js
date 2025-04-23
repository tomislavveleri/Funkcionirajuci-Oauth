"use client";
import { useState, useEffect } from "react";
import styles from "./Doutputbikes.module.css";
export default function Doutputresults() {
  const [results, setResults] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editResult, setEditResult] = useState({});
  const [deleteResult, setDeleteResult] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/results");
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    }
    fetchData();
  }, []);
  const handleChange = (e, field) => {
    setEditResult({ ...editResult, [field]: e.target.value });
  };
  const handleEdit = (result) => {
    setEditMode(result.id);
    setEditResult({ ...result });
  };
  const handleDelete = (result) => {
    setDeleteResult(result.id);
    setDeleteResult({ ...result });
  };

  const handleSave = async (id, action) => {
    try {
      if (action === "update") {
        const response = await fetch("/api/results", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editResult, id }),
        });
        if (!response.ok) throw new Error("Failed to update result");

        setResults((prev) =>
          prev.map((result) => (result.id === id ? editResult : result))
        );
        console.log("result updated sucessfully");
      }
      if (action === "delete") {
        const response = await fetch("/api/results", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) throw new Error("Failed to delete result");
        setResults((prev) => prev.filter((result) => result.id !== id));
      }
      setEditMode(null);
    } catch (err) {
      console.log("error in handle save", err);
    }
  };
  return (
    <div className={styles.dataResults}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Bike</th>
            <th>Track</th>
            <th>Setup</th>
            <th>Track time</th>
            <th>Track conditions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              {editMode === result.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editResult.selectedBike || ""}
                      onChange={(e) => handleChange(e, "selectedBike")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editResult.selectedTrack || ""}
                      onChange={(e) => handleChange(e, "selectedTrack")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editResult.selectedSetup || ""}
                      onChange={(e) => handleChange(e, "selectedSetup")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editResult.trackTime || ""}
                      onChange={(e) => handleChange(e, "trackTime")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editResult.trackConditions || ""}
                      onChange={(e) => handleChange(e, "trackConditions")}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(result.id, "update")}>
                      Save
                    </button>
                    <button onClick={() => handleSave(result.id, "delete")}>
                      Delete
                    </button>
                    <button onClick={() => setEditMode(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{result.selectedBike}</td>
                  <td>{result.selectedTrack}</td>
                  <td>{result.selectedSetup}</td>
                  <td>{result.trackTime}</td>
                  <td>{result.trackConditions}</td>
                  <td>
                    <button onClick={() => handleEdit(result)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
