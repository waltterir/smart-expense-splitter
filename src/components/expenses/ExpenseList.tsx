import type { Expense } from "../../types/expense";
import type { Person } from "../../types/person";
import { ExpenseItem } from "./ExpenseItem";

export type ExpenseListProps = {
  people: Person[];
  expenses: Expense[];
  onDeleteExpense: (id: number) => void;
};

export function ExpenseList(props: ExpenseListProps) {
  return (
    <div>
      <ul>
        {props.expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              people={props.people}
              onDeleteExpense={props.onDeleteExpense}
            />
          );
        })}
      </ul>
    </div>
  );
}
