export function ToyActionsBtns({ onToyDetails, onEditToy, onRemoveToy, toy }) {
  return (
    <section className='toy-actions-btns'>
      <button onClick={() => onToyDetails(toy._id)} className='btn-secondary'>
        Details
      </button>
      <button onClick={() => onEditToy(toy._id)} className='btn-secondary'>
        Edit
      </button>
      <button onClick={() => onRemoveToy(toy._id)} className='btn-secondary'>
        Remove
      </button>
    </section>
  )
}
