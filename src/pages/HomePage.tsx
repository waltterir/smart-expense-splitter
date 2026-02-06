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

  // listään henkilö listaan
  const addPerson = () => {
    const id = Date.now();
    const name = newName;
    const newPerson = { id, name };

    if (!newName.trim()) return; // tarkistaa ettei nimi ole tyhjä

    setNewName("");
    setPeople((prev) => [...prev, newPerson]);
  };

  // poistetaan henkilö listasta
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
              placeholder="Type a name: "
            />
            <button className="ml-5" onClick={addPerson}>
              Add
            </button>
          </div>
          {/* Lista ihmisistä */}
          <div>
            <p>Added people: </p>
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
          <div className="mb-5">
            <p>Description</p>
            <input
              className="bg-white text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              name="description"
              id="descriptionId"
              placeholder="Give Description:"
            />
          </div>

          <div className="mb-5">
            <h2>Amount</h2>
            <input
              className="bg-white text-black"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              name="amount"
              id="amountId"
              placeholder="Enter amount: "
            />
          </div>

          <select
            className="bg-gray-600 text-white"
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
            <option value="">Choose payer:</option>
            {people.map((person) => (
              <option value={person.id} key={person.id}>
                {person.id}
                {person.name}
              </option>
            ))}
          </select>
          <div className="mt-10">
            <p>Participants</p>
            {people.map((person) => (
              <ul>
                <li key={person.id}>
                  {person.name}
                  <input
                    type="checkbox"
                    checked={participantsId.includes(person.id)}
                    onChange={() => {
                      const isSelected = participantsId.includes(person.id);
                      if (isSelected) {
                        setParticipantsId((prev) =>
                          prev.filter(
                            (participantId) => participantId !== person.id,
                          ),
                        );
                      } else {
                        setParticipantsId((prev) => [...prev, person.id]);
                      }
                    }}
                  />
                </li>
              </ul>
            ))}
          </div>
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
