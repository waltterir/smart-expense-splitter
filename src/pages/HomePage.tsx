import { useState } from "react";
import type { Person } from "../types/person";
import type { Expense } from "../types/expense";

export function HomePage() {
  const [newName, setNewName] = useState("");
  const [people, setPeople] = useState<Person[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidById, setPaidById] = useState<number | null>(null);
  const [participantsId, setParticipantsId] = useState<number[]>([]);

  const addPerson = () => {
    const id = Date.now();
    const name = newName;
    const newPerson = { id, name };

    if (!newName.trim()) return; // tarkistaa ettei nimi ole tyhjä

    setNewName("");
    setPeople((prev) => [...prev, newPerson]);
  };

  const removePerson = (id: number) => {
    setPeople((prev) => prev.filter((person: Person) => person.id !== id));
  };

  return (
    <main className="layout">
      <div className="leftCol">
        <section className="panel">
          <h2 className="panelTitle">People</h2>
          {/* Form */}
          <div className="addPersonPanel">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              type="text"
              placeholder="Kirjoita nimi"
            />
            <button className="ml-5" onClick={addPerson}>
              Add
            </button>
          </div>
          {/* Lista ihmisistä */}
          <div>
            <p>Lisätyt ihmiset: </p>
            <ul>
              {people.length === 0 ? (
                <li>No people added yet</li>
              ) : (
                people.map((person) => (
                  <li key={person.id}>
                    {person.name}{" "}
                    <button
                      className="ml-5"
                      onClick={() => removePerson(person.id)}
                    >
                      Remove
                    </button>{" "}
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>
        <section className="panel">
          <h2 className="panelTitle">Expenses</h2>
          <p>Add expenses tänne</p>
          <select
            name="paidById"
            id="expenses"
            value={paidById ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setPaidById(null);
              } else {
                setPaidById(Number(value));
              }
            }}
          >
            <option value="">Valitse Maksaja: </option>
            {people.map((person) => (
              <option value={person.id} key={person.id}>
                {person.id}
                {person.name}
              </option>
            ))}
          </select>
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
