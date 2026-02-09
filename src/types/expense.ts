export type Expense = {
  id: number;
  amount: number;
  description: string;
  paidById: number | null;
  participantsId: number[];
};

export type ExpenseFormData = {
  amount: number;
  description: string;
  paidById: number | null;
  participantsId: number[];
};
