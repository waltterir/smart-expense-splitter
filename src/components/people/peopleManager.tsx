import type { Person } from "../../types/person";
import { PersonForm } from "./PersonForm";
import { PeopleList } from "./PeopleList";

export type PeopleManagerProps = {
  people: Person[];
  onAddPerson: (name: string) => void;
  onRemovePerson: (id: number) => void;
};

export function PeopleManager(props: PeopleManagerProps) {
  return (
    <section className="panel">
      <h2 className="panelTitle">People</h2>
      {/* Form */}
      <PersonForm onAddPerson={props.onAddPerson} />
      <PeopleList people={props.people} onRemovePerson={props.onRemovePerson} />
    </section>
  );
}
