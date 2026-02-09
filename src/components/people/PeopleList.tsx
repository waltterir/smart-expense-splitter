import type { Person } from "../../types/person";

export type PeopleListProps = {
  people: Person[];
  onRemovePerson: (id: number) => void;
};

export function PeopleList(props: PeopleListProps) {
  return (
    <div>
      <h3 className="subTitle">Added People: </h3>
      <ul className="peopleList">
        {props.people.length === 0 ? (
          <li className="expenseMeta">No people added yet</li>
        ) : (
          props.people.map((person) => (
            <li key={person.id} className="peopleRow">
              <span className="personName">{person.name}</span>
              <button
                className="removePersonBtn mb-3"
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
