import "./index.css";
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
const Notification = ({ message }) => {
  if (message === null) return;
  return <div className="notification">{message}</div>;
};
const ErrorMessage = ({ message }) => {
  if (message === null) return;
  return <div className="errorMessage">{message}</div>;
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationText, setNotificationText] = useState(null);
  const [errorText, setErrorText] = useState(null);

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
    let id = null;
    event.preventDefault();
    if (
      persons.find((person) => {
        if (
          person.name.trim().toLowerCase() ===
          newName.trim().toLocaleLowerCase()
        ) {
          id = person.id;
          return true;
        }
        return false;
      })
    ) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        dbService
          .updatePerson({ id, name: newName, number: newNumber })
          .then((updatePerson) => {
            const updatedPersons = persons.filter((person) => person.id !== id);
            setNotificationText(`Updated ${newName}`);
            setTimeout(() => {
              setNotificationText(null);
            }, 5000);
            setPersons([...updatedPersons, updatePerson]);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setErrorText(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setErrorText(null);
            }, 4000);
          });
      }
    } else {
      dbService
        .createPerson({ name: newName, number: newNumber })
        .then((createdPerson) => {
          setNotificationText(`Added ${newName}`);
          setTimeout(() => {
            setNotificationText(null);
          }, 5000);
          setPersons([...persons, createdPerson]);
        });
      setNewName("");
      setNewNumber("");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationText} />
      <ErrorMessage message={errorText} />
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
