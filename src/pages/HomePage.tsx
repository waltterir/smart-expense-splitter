import { useState } from "react";
import type { Person } from "../types/person";
import type { Expense } from "../types/expense";
import { SummaryPanel } from "../components/summary/SummaryPanel";

export function HomePage() {
  const [newName, setNewName] = useState("");
  const [people, setPeople] = useState<Person[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidById, setPaidById] = useState<number | null>(null);
  const [participantsId, setParticipantsId] = useState<number[]>([]);

  const addExpense = () => {
    if (description === "") {
      return;
    } else if (amount === "") {
      return;
    } else if (paidById === null) {
      return;
    } else if (participantsId.length === 0) {
      return;
    }
    const newExpense = {
      id: Date.now(),
      description: description,
      amount: amount,
      paidById: paidById,
      participantsId: participantsId,
    };
    setExpenses((prev) => [...prev, newExpense]);
    setDescription("");
    setAmount("");
    setPaidById(null);
    setParticipantsId([]);
  };

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

  const deleteExpense = (id: number) => {
    setExpenses((prev) =>
      prev.filter((expenses: Expense) => expenses.id !== id),
    );
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
                      className="ml-5 border-2"
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
              className="bg-white placeholder-black "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              name="description"
              id="descriptionId"
              placeholder="Give Description:"
            />
          </div>

          <div className="mb-5">
            <h2>Amount € </h2>
            <input
              className="bg-white placeholder-black"
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
                {person.name}
              </option>
            ))}
          </select>
          <div className="mt-10 mb-7">
            <p>Participants</p>
            {people.map((person) => (
              <ul>
                <li key={person.id}>
                  {person.name}
                  <input
                    className="ml-3"
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
            <button className="border-2 mb-3 mt-5" onClick={addExpense}>
              Add Expense
            </button>
          </div>
          <div>
            <ul>
              {expenses.map((expense) => {
                const payer = people.find((p) => p.id === expense.paidById); // haetaan maksajan nimi people listasta
                const participantsNames = expense.participantsId
                  .map((id) => {
                    const person = people.find((p) => p.id === id);
                    return person?.name;
                  })
                  .filter((name) => name !== undefined); // osallistuajien nimet listasta
                return (
                  <li key={expense.id}>
                    <div>{expense.description}</div>
                    <div>{expense.amount} €</div>
                    <div>Paid by: {payer?.name}</div>
                    <div className="mb-5">
                      Participants: {participantsNames.join(", ")}
                    </div>
                    <button
                      className="border-2 mb-5"
                      onClick={() => deleteExpense(expense.id)}
                    >
                      Delete Expense
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
      <div className="rightCol">
        <section className="panel">
          <h2 className="panelTitle">Summary</h2>
          <SummaryPanel people={people} expenses={expenses} />
        </section>
      </div>
    </main>
  );
}
