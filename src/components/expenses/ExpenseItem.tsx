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
    <li className="expenseCard">
      <div className="expenseTitle">{props.expense.description}</div>
      <div className="expenseMeta">{props.expense.amount} €</div>
      <div className="expenseMeta">Paid By: {payer?.name}</div>
      <div className="expenseMeta mb-5">
        Participants: {participantsNames.join(", ")}
      </div>
      <button
        className="deleteExpenseBtn"
        onClick={() => props.onDeleteExpense(props.expense.id)}
      >
        Delete Expense
      </button>
    </li>
  );
}
