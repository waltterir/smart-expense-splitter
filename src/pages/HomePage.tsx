import { useState } from "react";
import type { Person } from "../types/person";
import type { Expense, ExpenseFormData } from "../types/expense";
import { SummaryPanel } from "../components/summary/SummaryPanel";
import { PeopleManager } from "../components/people/peopleManager";
import { ExpenseForm } from "../components/expenses/ExpenseForm";
import { ExpenseList } from "../components/expenses/ExpenseList";

export function HomePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (data: ExpenseFormData) => {
    const newExpense = {
      id: Date.now(),
      description: data.description,
      amount: data.amount,
      paidById: data.paidById,
      participantsId: data.participantsId,
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  // listään henkilö listaan
  const addPerson = (name: string) => {
    const id = Date.now();
    const newPerson = { id, name };

    if (!name.trim()) return; // tarkistaa ettei nimi ole tyhjä
    setPeople((prev) => [...prev, newPerson]);
  };

  // poistetaan henkilö listasta
  const removePerson = (id: number) => {
    setPeople((prev) => prev.filter((person: Person) => person.id !== id));
  };

  const deleteExpense = (id: number) => {
    setExpenses((prev) =>
      prev.filter((expenses: Expense) => expenses.id !== id),
    );
  };

  return (
    <main className="layout">
      <div className="leftCol">
        <section>
          <PeopleManager
            people={people}
            onAddPerson={addPerson}
            onRemovePerson={removePerson}
          />
        </section>
        <section className="panel">
          <h2 className="panelTitle">Expenses</h2>
          <ExpenseForm people={people} onAddExpense={addExpense} />
          <ExpenseList
            people={people}
            expenses={expenses}
            onDeleteExpense={deleteExpense}
          />
        </section>
      </div>
      <div className="rightCol">
        <section className="panel">
          <h2 className="panelTitle">Summary</h2>
          <SummaryPanel people={people} expenses={expenses} />
        </section>
      </div>
    </main>
  );
}
