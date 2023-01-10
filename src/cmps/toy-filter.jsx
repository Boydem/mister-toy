import { useEffect, useRef, useState } from 'react'

import { toyService } from '../services/toy.service'
import { utilService } from '../services/util.service'

export function ToyFilter({ toys, setFilterBy, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
  const [labelsMap, setLabelsMap] = useState({})

  useEffect(() => {
    setLabelsMap(mapLabels())
  }, [toys])

  useEffect(() => {
    setFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function toggleLabelFilter(label) {
    if (filterBy.labels && filterBy.labels.includes(label)) {
      let updatedLabels = []
      if (filterBy.labels.length > 1) {
        updatedLabels = filterBy.labels.filter((l) => l !== label)
      }
      setFilterByToEdit((prev) => ({ ...prev, labels: updatedLabels }))
    } else {
      setFilterByToEdit((prev) => ({ ...prev, labels: [...filterByToEdit.labels, label] }))
    }
  }

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = type === 'number' ? +value : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function mapLabels() {
    return toys.reduce((acc, toy) => {
      if (!toy.labels || !toy.labels.length) return acc
      toy.labels.forEach((l) => (acc[l] ? acc[l]++ : (acc[l] = 1)))
      return acc
    }, {})
  }

  return (
    <section className='toy-filter'>
      <input
        onChange={handleChange}
        value={filterByToEdit.txt}
        type='text'
        name='txt'
        id='txt'
        placeholder='Search toy...'
      />
      <div className='labels'>
        Subject:
        {Object.keys(labelsMap).map((key, index) => {
          return (
            <div key={index}>
              <button onClick={() => toggleLabelFilter(key)} className='btn-filter-label'>
                {key} {`(${labelsMap[key]})`}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
