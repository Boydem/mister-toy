import { useEffect, useRef, useState } from 'react'

import { toyService } from '../services/toy.service'
import { utilService } from '../services/util.service'

export function ToySort({ setSortBy }) {
  function handleSortChange(keyToSortBy) {
    setSortBy(keyToSortBy)
  }

  return (
    <section className='toy-filter'>
      <button onClick={() => handleSortChange('title')}>Title</button>
      <button onClick={() => handleSortChange('price')}>Price</button>
    </section>
  )
}
