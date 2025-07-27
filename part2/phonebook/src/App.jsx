import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);

  const [newName, setNewName] = useState("");
  const handeInput = (e) => {
    setNewName(e.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName.trim())) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName }]);

      setNewName("");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handeInput} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name }) => (
        <div key={name}>{name}</div>
      ))}
    </div>
  );
};

export default App;
