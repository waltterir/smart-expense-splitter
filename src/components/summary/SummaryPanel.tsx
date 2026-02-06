import type { Person } from "../../types/person";
import type { Expense } from "../../types/expense";
import { computeBalances } from "../../lib/calculations/computeBalances";

type SummaryPanelProps = {
  people: Person[];
  expenses: Expense[];
};

export function SummaryPanel(props: SummaryPanelProps) {
  const balances = computeBalances(props.people, props.expenses);
  return (
    <div>
      <ul>
        {balances.map((person) => (
          <li
            className={
              person.net < 0
                ? "text-red-500"
                : person.net > 0
                  ? "text-green-500"
                  : ""
            }
            key={person.id}
          >
            {person.name}: {person.net.toFixed(2)} €
            {person.net < 0 ? " Owes" : ""}
            {person.net > 0 ? " Gets back" : ""}
            {person.net === 0 ? " Settled" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
