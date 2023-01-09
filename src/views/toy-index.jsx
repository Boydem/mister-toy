import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PageHero } from '../cmps/page-hero'

import { ToyFilter } from '../cmps/toy-filter'
import { ToyList } from '../cmps/toy-list'
import { loadToys, setFilter } from '../store/toy-action'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const navigate = useNavigate()
  useEffect(() => {
    loadToys(filterBy)
  }, [filterBy])

  function setFilterBy(filterBy) {
    setFilter(filterBy)
  }
  function onRemoveToy(toyId) {
    navigate(`/toy/${toyId}`)
  }
  function onToyDetails(toyId) {
    navigate(`/toy/${toyId}`)
  }

  function onEditToy(toyId) {
    navigate(`/toy/edit/${toyId}`)
  }

  return (
    <>
      <PageHero />
      <section className='toy-index'>
        <ToyFilter setFilterBy={setFilterBy} />

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ToyList
            toys={toys}
            onToyDetails={onToyDetails}
            onEditToy={onEditToy}
            onRemoveToy={onRemoveToy}
          />
        )}
      </section>
    </>
  )
}
