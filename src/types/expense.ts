export type Expense = {
  id: number;
  amount: string;
  description: string;
  paidById: number | null;
  participantsId: number[];
};
