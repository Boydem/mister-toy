import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { PageHero } from '../cmps/page-hero'

import { ToyFilter } from '../cmps/toy-filter'
import { ToyList } from '../cmps/toy-list'
import { loadToys, setFilter } from '../store/toy-action'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  useEffect(() => {
    loadToys(filterBy)
  }, [filterBy])

  function setFilterBy(filterBy) {
    setFilter(filterBy)
  }

  return (
    <>
      <PageHero />
      <section className='toy-index'>
        <ToyFilter setFilterBy={setFilterBy} />

        {isLoading ? <p>Loading...</p> : <ToyList toys={toys} />}
      </section>
    </>
  )
}
