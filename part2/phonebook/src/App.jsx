import { useState, useEffect } from "react";
import axios from "axios";
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
