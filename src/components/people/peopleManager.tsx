import type { Person } from "../../types/person";
import { useState } from "react";

export type PeopleManagerProps = {
  people: Person[];
  onAddPerson: (name: string) => void;
  onRemovePerson: (id: number) => void;
};

export function PeopleManager(props: PeopleManagerProps) {
  const [newName, setNewName] = useState("");
  return (
    <section className="panel">
      <h2 className="panelTitle">People</h2>
      {/* Form */}
      <div className="addPersonPanel">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          type="text"
          placeholder="Type a name: "
        />
        <button
          className="ml-5"
          onClick={() => {
            if (!newName.trim()) return;
            props.onAddPerson(newName);
            setNewName("");
          }}
        >
          Add
        </button>
      </div>
      {/* Lista ihmisistä */}
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
    </section>
  );
}
