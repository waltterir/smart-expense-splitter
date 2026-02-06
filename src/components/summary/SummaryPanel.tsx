import type { Person } from "../../types/person";
import type { Expense } from "../../types/expense";
import { computeBalances } from "../../lib/calculations/computeBalances";
import { BalanceTable } from "./BalanceTable";

type SummaryPanelProps = {
  people: Person[];
  expenses: Expense[];
};

export function SummaryPanel(props: SummaryPanelProps) {
  const balances = computeBalances(props.people, props.expenses);
  return (
    <div>
      <BalanceTable balances={balances} />
    </div>
  );
}
