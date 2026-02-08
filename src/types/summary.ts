import type { Person } from "./person";
import type { Expense } from "./expense";

export type SummaryPanelProps = {
  people: Person[];
  expenses: Expense[];
};
