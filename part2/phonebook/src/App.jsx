import { useState } from "react";
const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(({ name, number, id }) => (
        <div key={id}>
          {name} {number}
        </div>
      ))}
    </>
  );
};
const PersonForm = ({
  addPerson,
  handleNameInput,
  handlePhoneInput,
  newName,
  newPhone,
}) => {
  return (
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
  );
};
const Filter = ({ handleFilterInput, filter }) => (
  <div>
    filter shown with: <input onChange={handleFilterInput} value={filter} />
  </div>
);
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };
  const handlePhoneInput = (e) => {
    setNewPhone(e.target.value);
  };
  const handleFilterInput = (e) => {
    setFilter(e.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName.trim())) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([
        ...persons,
        { name: newName, number: newPhone, id: Math.random() },
      ]);

      setNewName("");
      setNewPhone("");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterInput={handleFilterInput} filter={filter} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameInput={handleNameInput}
        handlePhoneInput={handlePhoneInput}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
