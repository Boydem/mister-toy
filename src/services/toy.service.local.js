import { utilService } from './util.service.js'
import { localStorageService } from './storage.service.js'
import { storageService } from './async-storage.service.js'

import { httpService } from './http.service.js'

const BASE_URL = 'toy/'
const TOY_KEY = 'toyDB'

_createToys()

export const toyService = {
  query,
  get,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
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
  // const queryParams = `?txt=${filterBy.txt}&labels=${filterBy.labels}`
  // return httpService.get(BASE_URL + queryParams)
  return storageService.query(TOY_KEY).then((toys) => toys)
}

function get(toyId) {
  return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(TOY_KEY, toy)
  } else {
    // toy.owner = userService.getLoggedinUser()
    return storageService.post(TOY_KEY, toy)
  }
}

function _createToys() {
  let toys = localStorageService.loadFromStorage(TOY_KEY) || []
  if (!toys || !toys.length) {
    toys = []
    toys.push(_createToy('Tank', 120, ['Baby', 'Doll'], true, '1.png'))
    toys.push(_createToy('Piggy', 140, ['Baby', 'Doll'], true, '2.png'))
    toys.push(_createToy('Camera', 130, ['Puzzle', 'Doll', 'Outdoor'], true, '3.png'))
    toys.push(_createToy('Gun', 165, ['Baby', 'Doll'], true, '4.png'))
    toys.push(
      _createToy('Alphabet cubes', 170, ['Outdoor', 'Battery Powered', 'Doll'], true, '5.png')
    )
    toys.push(_createToy('Beach ball', 125, ['Outdoor', 'Baby', 'Battery Powered'], true, '6.png'))
    toys.push(_createToy('Doll', 270, ['Puzzle', 'Doll'], true, '7.png'))
    toys.push(_createToy('Plall', 120, ['Puzzle', 'Doll'], true, '8.png'))

    localStorageService.saveToStorage(TOY_KEY, toys)
  }
}

function _createToy(name, price, labels, inStock, imgUrl) {
  const toy = getEmptyToy(name, price, labels, inStock, imgUrl)
  toy._id = utilService.makeId()
  return toy
}
