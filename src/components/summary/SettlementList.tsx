import type { SettlementListProps } from "../../types/settlement";

export function SettlementList({ people, settlements }: SettlementListProps) {
  if (settlements.length === 0) {
    return <p>All Settled</p>;
  }
  return (
    <div>
      <ul>
        {settlements.map((settlement, index) => {
          const fromPerson = people.find((p) => p.id === settlement.fromId);
          const toPerson = people.find((p) => p.id === settlement.toId);
          return (
            <li key={index}>
              {fromPerson?.name} pays {toPerson?.name}:{" "}
              {settlement.amount.toFixed(2)} €
            </li>
          );
        })}
      </ul>
    </div>
  );
}
