"use client";

import { useState, useEffect } from "react";
import styles from "./Doutputbikes.module.css";

//originalno kao iz aplikacije

export default function Doutputbikes() {
  const [bikes, setBikes] = useState([]);
  const [editMode, setEditMode] = useState(null); // ID of bike being edited
  const [editedBike, setEditedBike] = useState({});
  const [deleteBike, setDeleteBike] = useState({});

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/bike");
        const data = await response.json();
        setBikes(data);
      } catch (err) {
        console.error("Error fetching bikes:", err);
      }
    }
    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e, field) => {
    setEditedBike({ ...editedBike, [field]: e.target.value });
  };

  // Enable edit mode and pre-fill data
  const handleEdit = (bike) => {
    setEditMode(bike.idBike);
    setEditedBike({ ...bike }); // Pre-fill inputs with existing data
  };
  const handleDelete = (bike) => {
    setDeleteBike(bike.idBike);
    setDeleteBike({ ...bike });
  };
  // Save changes
  const handleSave = async (idBike, action) => {
    try {
      if (action === "update") {
        const response = await fetch("/api/bike", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editedBike, idBike }), // Include idBike!
        });

        if (!response.ok) throw new Error("Failed to update bike");

        // Update the state to reflect changes
        setBikes((prev) =>
          prev.map((bike) => (bike.idBike === idBike ? editedBike : bike))
        );

        console.log("Bike updated successfully!");
      }
      if (action === "delete") {
        const response = await fetch("/api/bike", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idBike }), // Include idBike!
        });

        if (!response.ok) throw new Error("Failed to delete bike");

        // Update the state to reflect changes
        setBikes((prev) => prev.filter((bike) => bike.idBike !== idBike));

        console.log("Bike updated successfully!");
      }
      setEditMode(null); // Exit edit mode
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
            <th>Model</th>
            <th>Year</th>
            <th>Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike) => (
            <tr key={bike.idBike}>
              {editMode === bike.idBike ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editedBike.bikeName || ""}
                      onChange={(e) => handleChange(e, "bikeName")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedBike.model || ""}
                      onChange={(e) => handleChange(e, "model")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedBike.modelYear || ""}
                      onChange={(e) => handleChange(e, "modelYear")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedBike.bikeInfo || ""}
                      onChange={(e) => handleChange(e, "bikeInfo")}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(bike.idBike, "update")}>
                      Save
                    </button>
                    <button onClick={() => handleSave(bike.idBike, "delete")}>
                      Delete
                    </button>
                    <button onClick={() => setEditMode(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{bike.bikeName}</td>
                  <td>{bike.model}</td>
                  <td>{bike.modelYear}</td>
                  <td>{bike.bikeInfo}</td>
                  <td>
                    <button onClick={() => handleEdit(bike)}>Edit</button>
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
