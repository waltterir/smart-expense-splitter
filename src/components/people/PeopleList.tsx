import type { Person } from "../../types/person";

export type PeopleListProps = {
  people: Person[];
  onRemovePerson: (id: number) => void;
};

export function PeopleList(props: PeopleListProps) {
  return (
    <div>
      <h3 className="font-bold">Added People: </h3>
      <ul>
        {props.people.length === 0 ? (
          <li>No people added yet</li>
        ) : (
          props.people.map((person) => (
            <li key={person.id}>
              {person.name}{" "}
              <button
                className="ml-5 border-2"
                onClick={() => props.onRemovePerson(person.id)}
              >
                Remove
              </button>{" "}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
