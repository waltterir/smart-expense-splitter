import { useState } from "react";
export type PersonFormProps = {
  onAddPerson: (name: string) => void;
};

export function PersonForm(props: PersonFormProps) {
  const [newName, setNewName] = useState("");

  return (
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
  );
}
