import type { Person } from "../../types/person";
import { useState } from "react";
import type { ExpenseFormData } from "../../types/expense";

export type ExpenseFormProps = {
  people: Person[];
  onAddExpense: (data: ExpenseFormData) => void;
};

export function ExpenseForm(props: ExpenseFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidById, setPaidById] = useState<number | null>(null);
  const [participantsId, setParticipantsId] = useState<number[]>([]);

  return (
    <section>
      <div className="mb-5">
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
      <div className="mb-5">
        <h2>Amount € </h2>
        <input
          className="bg-white placeholder-black text-black"
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
        {props.people.map((person) => (
          <option value={person.id} key={person.id}>
            {person.name}
          </option>
        ))}
      </select>
      <div className="mt-10 mb-7">
        <p>Participants</p>
        {props.people.map((person) => (
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
        <button
          onClick={() => {
            if (!description.trim()) return;
            if (!amount.trim()) return;
            if (paidById === null) return;
            if (participantsId.length === 0) return;

            const data = {
              description,
              amount,
              paidById,
              participantsId,
            };

            props.onAddExpense(data);

            setDescription("");
            setAmount("");
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
