import type { Person } from "./person";

export type Settlement = {
  fromId: number;
  toId: number;
  amount: number;
};

export type SettlementListProps = {
  people: Person[];
  settlements: Settlement[];
};
