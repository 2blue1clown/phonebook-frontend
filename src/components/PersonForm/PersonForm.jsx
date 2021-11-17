
export default function PersonForm({submitCallback, handleNameChange, handleNumberChange, newName,newNumber }) {

  return (
    <div>
      <form onSubmit={submitCallback}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}