"use client";

import { useState, useEffect } from "react";
import styles from "./Doutputbikes.module.css";

export default function Doutputtracks() {
  const [tracks, setTracks] = useState([]);
  const [editMode, setEditMode] = useState(null); // ID of bike being edited
  const [editedTrack, setEditedTrack] = useState({});
  const [deleteTrack, setDeleteTrack] = useState({});

  useEffect(() => {
    //getting data from the backend
    async function fetchData() {
      try {
        const response = await fetch("/api/tracks");
        const data = await response.json();
        setTracks(data);
      } catch (err) {
        console.error("Error fetching tracks:", err);
      }
    }
    fetchData();
  }, []);
  //input changes
  const handleChange = (e, field) => {
    setEditedTrack({ ...editedTrack, [field]: e.target.value });
  };
  const handleEdit = (track) => {
    setEditMode(track.idTrack);
    setEditedTrack({ ...track }); //fill data
  };
  const handleDelete = (track) => {
    setDeleteTrack(track.idTrack);
    setDeleteTrack(...track);
  };
  const handleSave = async (idTrack, action) => {
    try {
      if (action === "update") {
        const response = await fetch("/api/tracks", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editedTrack, idTrack }), // Include idBike!
        });

        if (!response.ok) throw new Error("Failed to update track");

        // Update the state to reflect changes
        setTracks((prev) =>
          prev.map((track) => (track.idTrack === idTrack ? editedTrack : track))
        );
      }
      if (action === "delete") {
        const response = await fetch("/api/tracks", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idTrack }), // Include idBike!
        });

        if (!response.ok) throw new Error("Failed to delete");
        setTracks((prev) => prev.filter((track) => track.idTrack !== idTrack));

        console.log("Track deleted successfully!");
      }
      setEditMode(null);
    } catch (err) {
      console.error("Error updating bike:", err);
    }
  };
  return (
    <div className={styles.dataResults}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Info</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => (
            <tr key={track.idTrack}>
              {editMode === track.idTrack ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editedTrack.trackName || ""}
                      onChange={(e) => handleChange(e, "trackName")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedTrack.trackDescription || ""}
                      onChange={(e) => handleChange(e, "trackDescription")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedTrack.trackGrade || ""}
                      onChange={(e) => handleChange(e, "trackGrade")}
                    />
                  </td>

                  <td>
                    <button onClick={() => handleSave(track.idTrack, "update")}>
                      Save
                    </button>
                    <button onClick={() => handleSave(track.idTrack, "delete")}>
                      Delete
                    </button>
                    <button onClick={() => setEditMode(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{track.trackName}</td>
                  <td>{track.trackDescription}</td>
                  <td>{track.trackGrade}</td>

                  <td>
                    <button onClick={() => handleEdit(track)}>Edit</button>
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
