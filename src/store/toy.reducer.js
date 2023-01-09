import { todoService } from '../services/todo.service.js'

export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const UNDO_ADD_TODO = 'UNDO_ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UNDO_REMOVE_TODO = 'UNDO_REMOVE_TODO'
export const UNDO_UPDATE_TODO = 'UNDO_UPDATE_TODO'
export const SET_IS_LOADING = 'SET_IS_LOADING'

// FILTERS
export const SET_FILTER = 'SET_FILTER'

const initialState = {
  todos: [],
  filterBy: todoService.getDefaultFilter(),
  isLoading: false,
  lastRemovedTodo: null,
  lastUpdatedTodo: null,
}

export function todoReducer(state = initialState, action) {
  // {type: SOME_TYPE, data}
  let todos
  let lastRemovedTodo
  let lastUpdatedTodo

  switch (action.type) {
    // Todos
    case SET_TODOS:
      return { ...state, todos: action.todos }
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case ADD_TODO:
      todos = [action.todo, ...state.todos]
      return { ...state, todos: todos }
    case REMOVE_TODO: {
      let idx = state.todos.findIndex((todo) => todo._id === action.todoId)
      let todo = state.todos[idx]
      lastRemovedTodo = { todo, idx }
      todos = state.todos.filter((todo) => todo._id !== action.todoId)
      return { ...state, todos, lastRemovedTodo }
    }
    case UNDO_REMOVE_TODO: {
      state.todos.splice(state.lastRemovedTodo.idx, 0, state.lastRemovedTodo.todo)
      todos = [...state.todos]
      return { ...state, todos, lastRemovedTodo: null }
    }
    case UPDATE_TODO:
      lastUpdatedTodo = action.todo
      todos = state.todos.map((todo) => (todo._id === action.todo._id ? action.todo : todo))
      return { ...state, todos, lastUpdatedTodo }
    case UNDO_UPDATE_TODO:
      todos = state.todos.map((todo) =>
        todo._id === action.todo._id ? state.lastUpdatedTodo : todo
      )
      return { ...state, todos, lastUpdatedTodo: null }
    // Filter
    case SET_FILTER:
      return { ...state, filterBy: action.filterBy }

    //   Defalut
    default:
      return { ...state }
  }
}
