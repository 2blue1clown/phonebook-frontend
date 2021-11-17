import React, { useState, useEffect } from 'react'
import People from './components/People/people'
import PersonForm from './components/PersonForm/PersonForm'
import SearchFilter from './components/SearchFilter/SearchFilter'
import personsService from './services/persons'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('name')
  const [newNumber, setNewNumber] = useState('number')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  //fetch the current data from the JSON server
  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    if (!persons.map(person => person.name).includes(newName)) {
      const newPerson = { name: newName, number: newNumber }
      //setPersons([...persons, newPerson])
      console.log('posting')
      personsService
        .create(newPerson) // This is a service method defined in services/persons.js
        .then(response => {
          setPersons(persons.concat(response.data))
        })

      setNewName('')
      setNewNumber('')
    }
    else {
      window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)
      const updatedPersons = [...persons]
      const index = updatedPersons.findIndex(p => p.name === newName)
      const id = updatedPersons[index].id
      console.log(`updating ${id}`)
      updatedPersons[index].number = newNumber
      personsService
        .update(id,updatedPersons[index])
        .then(response => {
          //console.log(response);
          setPersons(updatedPersons)

          setNewName('')
          setNewNumber('')
        })
      
    }
  }

  console.log({persons,filter})
  const filteredPersons = persons.filter(person => person.name.includes(filter))

  const removePerson = (name) => {
    return () => {
      if(window.confirm(`Delete ${name} from the phonebook?`)){
      const person = persons.find(p => p.name === name)
      console.log(`removing ${person.name}`)
      personsService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          alert(
            `The person "${person.name} was already deleted from the server`
          )
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }}
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search</h3>
      <SearchFilter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>PersonForm</h3>
      <PersonForm submitCallback={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {filteredPersons.map(person => (
        <People key={person.name} name={person.name} number={person.number} handleClick={removePerson(person.name)} />
      )
      )}
    </div>
  )
}

export default App



