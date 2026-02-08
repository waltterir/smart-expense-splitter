import type { Balance } from "../../types/balance";
import type { Settlement } from "../../types/settlement";

export function computeSettlements(balances: Balance[]): Settlement[] {
  const creditors = balances
    .filter((person) => person.net > 0)
    .map((person) => ({ id: person.id, remaining: person.net }));
  const debtors = balances
    .filter((person) => person.net < 0)
    .map((person) => ({ id: person.id, remaining: -person.net }));
}
