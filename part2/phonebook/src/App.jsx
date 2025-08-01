import { useState, useEffect } from "react";
import dbService from "./services/dbPersons";
const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map(({ name, number, id }) => (
        <div key={id}>
          {name} {number}
          <button
            onClick={() => {
              handleDelete(id, name);
            }}
          >
            delete
          </button>
        </div>
      ))}
    </>
  );
};
const PersonForm = ({
  addPerson,
  handleNameInput,
  handleNumberInput,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handleNameInput} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberInput} value={newNumber} />
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
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dbService
      .getAll()
      .then((returnedPersons) => {
        setPersons(returnedPersons);
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
  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterInput = (e) => {
    setFilter(e.target.value);
  };
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      dbService
        .deletePerson(id)
        .then((deletedPerson) => {
          const changedState = persons.filter(
            (person) => person.id !== deletedPerson.id
          );
          setPersons(changedState);
        })
        .catch((error) => {
          console.log("Something went wrong");
          console.log(error);
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName.trim())) {
      alert(`${newName} is already added to Numberbook`);
    } else {
      dbService
        .createPerson({ name: newName, number: newNumber })
        .then((createdPerson) => {
          setPersons([...persons, createdPerson]);
        });
      setNewName("");
      setNewNumber("");
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
        handleNumberInput={handleNumberInput}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
