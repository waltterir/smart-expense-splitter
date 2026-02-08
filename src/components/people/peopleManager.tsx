import type { Person } from "../../types/person";

export type PeopleManagerProps = {
  people: Person[];
  onAddPerson: (name: string) => void;
  onRemovePerson: (id: number) => void;
};

export function PeopleManager(props: PeopleManagerProps) {}
