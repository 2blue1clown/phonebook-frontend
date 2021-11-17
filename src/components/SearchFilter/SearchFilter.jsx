
export default function SearchFilter({filter,handleFilterChange }) {
  return (<div>
    Search: <input value={filter} onChange={handleFilterChange} />
  </div>)
}
