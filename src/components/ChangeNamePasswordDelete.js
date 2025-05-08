"use client";

import { useState, useEffect } from "react";
import styles from "./Doutputbikes.module.css";

//originalno kao iz aplikacije

export default function ChangeNamePasswordDelete() {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(null); // ID of bike being edited
  const [editedUser, setEditedUser] = useState({});

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e, field) => {
    setEditedUser({ ...editedUser, [field]: e.target.value });
  };

  // Enable edit mode and pre-fill data
  const handleEdit = (user) => {
    setEditMode(user.id);
    setEditedUser({ ...user }); // Pre-fill inputs with existing data
  };

  // Save changes
  const handleSave = async (id, action) => {
    try {
      if (action === "update") {
        const response = await fetch("/api/user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editedUser, id }), // Include idBike!
        });

        if (!response.ok) throw new Error("Failed to update user");

        // Update the state to reflect changes
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? editedUser : user))
        );

        console.log("User updated successfully!");
      }
      if (action === "delete") {
        const response = await fetch("/api/user", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }), // Include idBike!
        });

        if (!response.ok) throw new Error("Failed to delete user");

        // Update the state to reflect changes
        setUsers((prev) => prev.filter((user) => user.id !== id));

        console.log("User updated successfully!");
      }
      setEditMode(null); // Exit edit mode
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div>
      <div className={styles.dataResults}>
        {editMode === users.id ? (
          <>
            <input
              type="text"
              value={editedUser.name || ""}
              onChange={(e) => handleChange(e, "name")}
            />

            <input
              type="text"
              value={editedUser.password || ""}
              onChange={(e) => handleChange(e, "password")}
            />

            <button onClick={() => handleSave(users.id, "update")}>Save</button>
            <button onClick={() => handleSave(users.id, "delete")}>
              Delete
            </button>
            <button onClick={() => setEditMode(null)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => handleEdit(users)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
}
