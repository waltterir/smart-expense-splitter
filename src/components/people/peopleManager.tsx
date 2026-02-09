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
    <>
      <h2 className="panelTitle">People</h2>
      <PersonForm onAddPerson={props.onAddPerson} />
      <PeopleList people={props.people} onRemovePerson={props.onRemovePerson} />
    </>
  );
}
