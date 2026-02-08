export type Settlement = {
  fromId: number;
  toId: number;
  amount: number;
};

export type SettlementListProps = {
  settlements: Settlement[];
};
