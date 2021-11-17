
export default function People({name,number,handleClick}) {

  return (
    <div>
        <p key={name}>{name} {number}</p>
        <button onClick={handleClick}>Remove</button>
    </div>
  )
}