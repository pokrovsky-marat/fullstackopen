import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-1234567" },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };
  const handlePhoneInput = (e) => {
    setNewPhone(e.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName.trim())) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName, phone: newPhone }]);

      setNewName("");
      setNewPhone("");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameInput} value={newName} />
        </div>
        <div>
          number: <input onChange={handlePhoneInput} value={newPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name, phone }) => (
        <div key={name}>
          {name} {phone}
        </div>
      ))}
    </div>
  );
};

export default App;
