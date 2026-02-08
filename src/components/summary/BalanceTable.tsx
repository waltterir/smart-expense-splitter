import type { BalanceTableProps } from "../../types/balance";

export function BalanceTable({ balances }: BalanceTableProps) {
  return (
    <ul>
      {balances.map((person) => (
        <li
          className={
            person.net < 0
              ? "text-red-500"
              : person.net > 0
                ? "text-green-500"
                : ""
          }
          key={person.id}
        >
          {person.name}:{person.net < 0 ? " Owes " : ""}
          {person.net > 0 ? " Gets back " : ""}
          {person.net === 0 ? " Settled " : ""}
          {person.net.toFixed(2)} €
        </li>
      ))}
    </ul>
  );
}
