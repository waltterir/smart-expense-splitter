import { computeBalances } from "../../lib/calculations/computeBalances";
import { BalanceTable } from "./BalanceTable";
import type { SummaryPanelProps } from "../../types/summary";
import { SettlementList } from "./SettlementList";
import { computeSettlements } from "../../lib/calculations/computeSettlements";

export function SummaryPanel({ people, expenses }: SummaryPanelProps) {
  if (expenses.length === 0) {
    return <p className="font-bold">No expenses yet</p>;
  }
  const balances = computeBalances(people, expenses);
  const settlements = computeSettlements(balances);

  return (
    <div>
      <h3 className="mb-2 mt-4 font-bold">Balances: </h3>
      <BalanceTable balances={balances} />
      <h3 className="mb-2 mt-4 font-bold">Suggested Payments: </h3>
      <SettlementList settlements={settlements} people={people} />
    </div>
  );
}
