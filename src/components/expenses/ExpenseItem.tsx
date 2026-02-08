import type { Expense } from "../../types/expense";
import type { Person } from "../../types/person";

export type ExpenseItemProps = {
  expense: Expense;
  people: Person[];
  onDeleteExpense: (id: number) => void;
};

export function ExpenseItem(props: ExpenseItemProps) {
  const payer = props.people.find((p) => p.id === props.expense.paidById); // haetaan maksajan nimi people listasta
  const participantsNames = props.expense.participantsId
    .map((id) => {
      const person = props.people.find((p) => p.id === id);
      return person?.name;
    })
    .filter((name) => name !== undefined); // osallistuajien nimet listasta
  return (
    <li>
      <div>{props.expense.description}</div>
      <div>{props.expense.amount} €</div>
      <div>Paid By: {payer?.name}</div>
      <div>Participants: {participantsNames.join(", ")}</div>
      <button
        className="border-2 mt-5"
        onClick={() => props.onDeleteExpense(props.expense.id)}
      >
        Delete Expense
      </button>
    </li>
  );
}
