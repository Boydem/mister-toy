import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PageHero } from '../cmps/page-hero'

import { ToyFilter } from '../cmps/toy-filter'
import { ToyList } from '../cmps/toy-list'
import { ToySort } from '../cmps/toy-sort'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { loadToys, removeToy, setFilter, setSort } from '../store/toy-action'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const navigate = useNavigate()

  useEffect(() => {
    loadToys(filterBy).catch((err) => {
      console.log('err loading toys:', err)
    })
  }, [filterBy])

  function setFilterBy(filterBy) {
    setFilter(filterBy)
  }

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => showSuccessMsg('Toy Removed!'))
      .catch((err) => showErrorMsg('Toy Remove Failed!'))
  }

  function onToyDetails(toyId) {
    navigate(`/toy/${toyId}`)
  }

  function onEditToy(toyId) {
    navigate(`/toy/edit/${toyId}`)
  }

  function onNewToy() {
    navigate(`/toy/edit`)
  }

  return (
    <>
      <PageHero />
      <section className='toy-index main-layout'>
        <ToyFilter toys={toys} filterBy={filterBy} setFilterBy={setFilterBy} />

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ToyList
            toys={toys}
            onNewToy={onNewToy}
            onToyDetails={onToyDetails}
            onEditToy={onEditToy}
            onRemoveToy={onRemoveToy}
          />
        )}
      </section>
    </>
  )
}
