import { utilService } from './util.service.js'
import { localStorageService } from './storage.service.js'
import { storageService } from './async-storage.service.js'

import { httpService } from './http.service.js'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'

export const toyService = {
  query,
  get,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
  getFilterFromSearchParams,
}

function getDefaultSort() {
  return { title: false, price: false, createdAt: false }
}

function getEmptyToy(
  name = 'Unnamed Toy',
  price = 123,
  labels = ['Baby', 'Art'],
  inStock = true,
  imgUrl = '15.png'
) {
  return {
    name,
    price,
    labels,
    inStock,
    imgUrl,
  }
}

function getDefaultFilter() {
  return { txt: '', labels: [] }
}

function query(filterBy = getDefaultFilter()) {
  const queryParams = `?txt=${filterBy.txt}&labels=${filterBy.labels}`
  return httpService.get(BASE_URL + queryParams)
}

function get(toyId) {
  return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy)
  } else {
    return httpService.post(BASE_URL, toy)
  }
}

function getFilterFromSearchParams(searchParams) {
  const emptyFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in emptyFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}
