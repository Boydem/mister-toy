import { useEffect, useRef, useState } from 'react'
import { toyService } from '../services/toy.service'
import { utilService } from '../services/util.service'

export function ToyFilter({ setFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

  setFilterBy = useRef(utilService.debounce(setFilterBy))

  useEffect(() => {
    setFilterBy.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = type === 'number' ? +value : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section className='toy-filter'>
      <select onChange={handleChange} defaultValue={filterByToEdit.label} name='label' id='label'>
        <option value=''>All</option>
        <option value='doll'>Doll</option>
        <option value='baby'>Baby</option>
      </select>
      <input
        onChange={handleChange}
        value={filterByToEdit.txt}
        type='text'
        name='txt'
        id='txt'
        placeholder='Search toy...'
      />
    </section>
  )
}
