export type Balance = {
  id: number;
  name: string;
  paid: number;
  shouldPay: number;
  net: number;
};

export type BalanceTableProps = {
  balances: Balance[];
};
