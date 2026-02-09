import type { SettlementListProps } from "../../types/settlement";

export function SettlementList({ people, settlements }: SettlementListProps) {
  return (
    <div>
      <ul className="summaryList">
        {settlements.map((settlement, index) => {
          const fromPerson = people.find((p) => p.id === settlement.fromId);
          const toPerson = people.find((p) => p.id === settlement.toId);
          return (
            <li key={index} className="summaryCard">
              {fromPerson?.name} Pays {toPerson?.name}:{" "}
              {settlement.amount.toFixed(2)} €
            </li>
          );
        })}
      </ul>
    </div>
  );
}
