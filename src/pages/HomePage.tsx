import React, { useState } from "react";
import type { Person } from "../types/person";

export function HomePage() {
  const [newName, setNewName] = useState("");
  const [people, setPeople] = useState<Person[]>([]);

  const addPerson = () => {
    const id = Date.now();
    const name = newName;
    const newPerson = { id, name };

    if (newName.trim() === "") return;

    setNewName("");
    setPeople((prev) => [...prev, newPerson]);
    console.log("lisääkö");
  };
  return (
    <main className="layout">
      <div className="leftCol">
        <section className="panel">
          <h2 className="panelTitle">People</h2>
          <p>add people tänne</p>
          {/* Formi */}
          <div className="addPeoplePanel">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              type="text"
              placeholder="Kirjoita nimi"
            />
            <button onClick={addPerson}>Add</button>
          </div>
          {/* Lista ihmisistä */}
          <div>
            <p>Lisätyt ihmiset: </p>
            <ul>
              <li>Wate</li>
              <li>Stella</li>
              <li>Nakki</li>
              <li>Benkku</li>
            </ul>
          </div>
        </section>
        <section className="panel">
          <h2 className="panelTitle">Expenses</h2>
          <p>Add expenses tänne</p>
        </section>
      </div>
      <div className="rightCol">
        <section className="panel">
          <h2 className="panelTitle">Summary</h2>
          <p>summary näkyy täällä</p>
        </section>
      </div>
    </main>
  );
}
