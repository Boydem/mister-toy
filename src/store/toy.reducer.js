import { toyService } from '../services/toy.service.js'

export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const UNDO_ADD_TOY = 'UNDO_ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const UNDO_REMOVE_TOY = 'UNDO_REMOVE_TOY'
export const UNDO_UPDATE_TOY = 'UNDO_UPDATE_TOY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

// FILTERS
export const SET_FILTER = 'SET_FILTER'

const initialState = {
  toys: [],
  filterBy: toyService.getDefaultFilter(),
  isLoading: false,
  lastRemovedToy: null,
  lastUpdatedToy: null,
}

export function toyReducer(state = initialState, action) {
  // {type: SOME_TYPE, data}
  let toys
  let lastRemovedToy
  let lastUpdatedToy

  switch (action.type) {
    // Toys
    case SET_TOYS:
      return { ...state, toys: action.toys }
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case ADD_TOY:
      toys = [action.toy, ...state.toys]
      return { ...state, toys: toys }
    case REMOVE_TOY: {
      let idx = state.toys.findIndex((toy) => toy._id === action.toyId)
      let toy = state.toys[idx]
      lastRemovedToy = { toy, idx }
      toys = state.toys.filter((toy) => toy._id !== action.toyId)
      return { ...state, toys, lastRemovedToy }
    }
    case UNDO_REMOVE_TOY: {
      state.toys.splice(state.lastRemovedToy.idx, 0, state.lastRemovedToy.toy)
      toys = [...state.toys]
      return { ...state, toys, lastRemovedToy: null }
    }
    case UPDATE_TOY:
      lastUpdatedToy = action.toy
      toys = state.toys.map((toy) => (toy._id === action.toy._id ? action.toy : toy))
      return { ...state, toys, lastUpdatedToy }
    case UNDO_UPDATE_TOY:
      toys = state.toys.map((toy) => (toy._id === action.toy._id ? state.lastUpdatedToy : toy))
      return { ...state, toys, lastUpdatedToy: null }
    // Filter
    case SET_FILTER:
      return { ...state, filterBy: action.filterBy }

    //   Defalut
    default:
      return { ...state }
  }
}
