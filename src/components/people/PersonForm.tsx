import { useState } from "react";
export type PersonFormProps = {
  onAddPerson: (name: string) => void;
};

export function PersonForm(props: PersonFormProps) {
  const [newName, setNewName] = useState("");

  return (
    <div className="addPersonPanel">
      <input
        className="peopleInput"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        type="text"
        placeholder="Enter name..."
      />

      <button
        className="addPersonBtn"
        onClick={() => {
          if (!newName.trim()) return;
          props.onAddPerson(newName);
          setNewName("");
        }}
      >
        Add
      </button>
    </div>
  );
}
