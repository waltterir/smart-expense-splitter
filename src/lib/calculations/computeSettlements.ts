import type { Balance } from "../../types/balance";
import type { Settlement } from "../../types/settlement";
import { roundToCents } from "./helpers";

export function computeSettlements(balances: Balance[]): Settlement[] {
  const creditors = balances
    .filter((person) => person.net > 0)
    .map((person) => ({ id: person.id, remaining: person.net }));
  const debtors = balances
    .filter((person) => person.net < 0)
    .map((person) => ({ id: person.id, remaining: -person.net }));

  // paikka mihin kerätään maksut
  let i: number = 0;
  let j: number = 0;
  const settlements: Settlement[] = [];

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const payAmount = Math.min(debtor.remaining, creditor.remaining);

    settlements.push({
      fromId: debtor.id,
      toId: creditor.id,
      amount: payAmount,
    });

    debtor.remaining -= payAmount;
    creditor.remaining -= payAmount;

    if (debtor.remaining < 0.005) {
      i++;
    }
    if (creditor.remaining < 0.005) {
      j++;
    }
  }
  return settlements;
}
