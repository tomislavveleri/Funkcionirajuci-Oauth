"use client";
import { useState, useEffect } from "react";
import styles from "./Doutputbikes.module.css";
export default function Doutputsetups() {
  const [setup, setSetup] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedSetup, setEditedSetup] = useState({});
  const [deleteSetup, setDeletedSetup] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/setups");
        const data = await response.json();
        setSetup(data);
      } catch (err) {
        console.error("Error fetching tracks:", err);
      }
    }
    fetchData();
  }, []);
  const handleChange = (e, field) => {
    setEditedSetup({ ...editedSetup, [field]: e.target.value });
  };
  const handleEdit = (setup) => {
    setEditMode(setup.idSetup);
    setEditedSetup({ ...setup });
  };
  const handleDelete = (setup) => {
    setDeletedSetup(setup.idSetup);
    setDeletedSetup(...setup);
  };
  const handleSave = async (idSetup, action) => {
    try {
      if (action === "update") {
        const response = await fetch("/api/setups", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editedSetup, idSetup }),
        });

        if (!response.ok) throw new Error("Failed to update");
        setSetup((prev) =>
          prev.map((setup) => (setup.idSetup === idSetup ? editedSetup : setup))
        );
      }
      if (action === "delete") {
        const response = await fetch("/api/setups", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editedSetup, idSetup }),
        });
        if (!response.ok) throw new Error("Failed to update");
        setSetup((prev) => prev.filter((setup) => setup.idSetup !== idSetup));
        console.log("Deleted setup sucessfully");
      }
      setEditMode(null);
    } catch (err) {
      console.error("Error handle save: ", err);
    }
  };
  return (
    <div className={styles.dataResults}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rear Tyre</th>
            <th>Shock</th>
            <th>HSR Rear</th>
            <th>LSR Rear</th>
            <th>HSC Rear</th>
            <th>LSC Rear</th>
            <th>Tokens Shock</th>
            <th>SAG Rear</th>
            <th>Front Tyre</th>
            <th>Fork</th>
            <th>HSR Front</th>
            <th>LSR Front</th>
            <th>HSC Front</th>
            <th>LSC Front</th>
            <th>Tokens Fork</th>
            <th>SAG</th>
          </tr>
        </thead>
        <tbody>
          {setup.map((setup) => (
            <tr key={setup.idSetup}>
              {editMode === setup.idSetup ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.SetupName || ""}
                      onChange={(e) => handleChange(e, "setupName")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.tlakGumeZadnja || ""}
                      onChange={(e) => handleChange(e, "frontTyrePressure ")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.tlakShock || ""}
                      onChange={(e) => handleChange(e, "forkPressure")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.HSRZadnji || ""}
                      onChange={(e) => handleChange(e, "hsrf")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.LSRZadnji || ""}
                      onChange={(e) => handleChange(e, "lsrf")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.HSCZadnji || ""}
                      onChange={(e) => handleChange(e, "hscf")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.LSCZadnji || ""}
                      onChange={(e) => handleChange(e, "lscf")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.brojTokenaZadnji || ""}
                      onChange={(e) => handleChange(e, "tokenNumberf")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.SAGZadnji || ""}
                      onChange={(e) => handleChange(e, "sagf")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.tlakGumePrednja || ""}
                      onChange={(e) => handleChange(e, "rearTyrePressure")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.tlakVilica || ""}
                      onChange={(e) => handleChange(e, "shockPressure")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.HSR || ""}
                      onChange={(e) => handleChange(e, "hsrr")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.LSR || ""}
                      onChange={(e) => handleChange(e, "lsrr")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.HSC || ""}
                      onChange={(e) => handleChange(e, "hscr")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.LSC || ""}
                      onChange={(e) => handleChange(e, "lscr")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.brojTokena || ""}
                      onChange={(e) => handleChange(e, "tokenNumberr")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSetup.SAG || ""}
                      onChange={(e) => handleChange(e, "sagr")}
                    />
                  </td>

                  <td>
                    <button onClick={() => handleSave(setup.idSetup, "update")}>
                      Save
                    </button>
                    <button onClick={() => handleSave(setup.idSetup, "delete")}>
                      Delete
                    </button>
                    <button onClick={() => setEditMode(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{setup.setupName}</td>
                  <td>{setup.frontTyrePressure}</td>
                  <td>{setup.forkPressure}</td>
                  <td>{setup.hsrf}</td>
                  <td>{setup.lsrf}</td>
                  <td>{setup.hscf}</td>
                  <td>{setup.lscf}</td>
                  <td>{setup.tokenNumberf}</td>
                  <td>{setup.sagf}</td>
                  <td>{setup.rearTyrePressure}</td>
                  <td>{setup.shockPressure}</td>
                  <td>{setup.hsrr}</td>
                  <td>{setup.lsrr}</td>
                  <td>{setup.hscr}</td>
                  <td>{setup.lscr}</td>
                  <td>{setup.tokenNumverr}</td>
                  <td>{setup.sagr}</td>

                  <td>
                    <button onClick={() => handleEdit(setup)}>Edit</button>
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
