import { toyService } from '../services/toy.service.js'

import { store } from '../store/store.js'
import {
  REMOVE_TOY,
  SET_TOYS,
  ADD_TOY,
  UPDATE_TOY,
  SET_FILTER,
  SET_SORT,
  SET_IS_LOADING,
  UNDO_REMOVE_TOY,
  UNDO_UPDATE_TOY,
} from '../store/toy.reducer.js'

// Toys
export function loadToys(filterBy) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  return toyService
    .query(filterBy)
    .then((toys) => {
      store.dispatch({ type: SET_TOYS, toys })
    })
    .catch((err) => {
      console.log('Had issues loading toys', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  if (type === UPDATE_TOY) store.dispatch({ type: UPDATE_TOY, toy })
  return toyService
    .save(toy)
    .then((savedToy) => {
      if (type === ADD_TOY) store.dispatch({ type: ADD_TOY, toy: savedToy })
      return savedToy
    })
    .catch((err) => {
      if (type === UPDATE_TOY) store.dispatch({ type: UNDO_UPDATE_TOY, toy })
      console.error('Cannot save toy:', err)
      throw err
    })
}

export function setFilter(filterBy) {
  store.dispatch({ type: SET_FILTER, filterBy })
}

export function removeToy(toyId) {
  store.dispatch({ type: REMOVE_TOY, toyId })
  return toyService.remove(toyId).catch((err) => {
    store.dispatch({ type: UNDO_REMOVE_TOY, toyId })
    console.log('Had issues Removing toy', err)
    throw err
  })
}

export function setSort(sortBy) {
  store.dispatch({ type: SET_SORT, sortBy })
}
