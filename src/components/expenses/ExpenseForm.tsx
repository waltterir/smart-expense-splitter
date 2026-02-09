import type { Person } from "../../types/person";
import { useState } from "react";
import type { ExpenseFormData } from "../../types/expense";

export type ExpenseFormProps = {
  people: Person[];
  onAddExpense: (data: ExpenseFormData) => void;
};

export function ExpenseForm(props: ExpenseFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [paidById, setPaidById] = useState<number | null>(null);
  const [participantsId, setParticipantsId] = useState<number[]>([]);

  return (
    <section>
      <div className="mb-8">
        <p>Description</p>
        <input
          className="bg-white placeholder-black text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="description"
          id="descriptionId"
          placeholder="Give Description:"
        />
      </div>
      <div className="mb-5 mb-8">
        <h2>Amount € </h2>
        <input
          className="bg-white placeholder-black text-black"
          value={amount === 0 ? "" : amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          type="number"
          name="amount"
          id="amountId"
          placeholder="Enter amount: "
        />
      </div>
      <select
        className="payerSelect"
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
        {props.people.map((person) => (
          <option value={person.id} key={person.id}>
            {person.name}
          </option>
        ))}
      </select>
      <div className="mt-10 mb-7">
        <h3>Participants</h3>
        <ul className="participantsList">
          {props.people.map((person) => (
            <li key={person.id} className="participantRow">
              <input
                type="checkbox"
                checked={participantsId.includes(person.id)}
                onChange={() => {
                  const isSelected = participantsId.includes(person.id);
                  setParticipantsId((prev) =>
                    isSelected
                      ? prev.filter((id) => id !== person.id)
                      : [...prev, person.id],
                  );
                }}
              />

              <span>{person.name}</span>
            </li>
          ))}
        </ul>

        <button
          className="addExpenseBtn mt-5"
          onClick={() => {
            if (!description.trim()) return;
            if (amount <= 0) return;
            if (paidById === null) return;
            if (participantsId.length === 0) return;

            const data = {
              description: description.trim(),
              amount,
              paidById,
              participantsId,
            };

            props.onAddExpense(data);

            setDescription("");
            setAmount(0);
            setPaidById(null);
            setParticipantsId([]);
          }}
        >
          Add Expense
        </button>
      </div>
    </section>
  );
}
