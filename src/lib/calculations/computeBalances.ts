import type { Person } from "../../types/person";
import type { Expense } from "../../types/expense";

export function computeBalances(people: Person[], expenses: Expense[]) {
  // map paljonko kukin maksoi
  const paidMap: Map<number, number> = new Map();
  // iteroidaan lista läpi ja annetaan kaikille alkuarvo 0
  for (let i = 0; i < people.length; i++) {
    paidMap.set(people[i].id, 0); // <-- alkuarvo 0
  }
  for (let expense of expenses) {
    const payerid = expense.paidById;
    const amountNum = Number(expense.amount);
    if (payerid === null) {
      continue;
    }
    const current = paidMap.get(payerid);
    const currentPaid = current ?? 0; // <-- tämä on fallback 0 / jos map palauttaa undefiened -> käytä 0
    paidMap.set(payerid, currentPaid + amountNum);
  }

  // uusimap mitä kenenkin kuuluisi maksaa
  const shouldPayMap: Map<number, number> = new Map();
  for (let i = 0; i < people.length; i++) {
    shouldPayMap.set(people[i].id, 0); // <-- alkuarvo 0
  }
  for (let expense of expenses) {
    const amountNum = Number(expense.amount);
    const participantsCount = expense.participantsId.length;
    const share = amountNum / participantsCount;
    expense.participantsId.forEach((participantId) => {
      const current = shouldPayMap.get(participantId);
      const currentShouldPay = current ?? 0; // <-- tämä on fallback 0 / jos map palauttaa undefiened -> käytä 0
      shouldPayMap.set(participantId, currentShouldPay + share);
    });
  }
  const balances = [];
  // net saldo per henkilö
  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    const paid = paidMap.get(person.id);
    const shouldPay = shouldPayMap.get(person.id);
    const paidValue = paid ?? 0; // <-- tämä on fallback 0 / jos map palauttaa undefiened -> käytä 0
    const shouldPayValue = shouldPay ?? 0; // <-- tämä on fallback 0 / jos map palauttaa undefiened -> käytä 0
    const net = paidValue - shouldPayValue;
    balances.push({
      id: person.id,
      name: person.name,
      paid: paidValue,
      shouldPay: shouldPayValue,
      net: net,
    }); // Pushataan balances-arrayhin olio
  }
  return balances;
}
