import { userService } from './user.service.js'
import { utilService } from './util.service.js'
import { localStorageService } from './storage.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'
_createToys()
export const toyService = {
  query,
  get,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
}

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

function getEmptyToy(name = 'Unnamed Toy', price = 123 , labels , inStock = true) {
  return {
    name,
    price,
    labels,
    inStock
}
}

function getDefaultFilter() {
  return { txt: '', label: '' }
}

function query(filterBy = getDefaultFilter()) {
  return storageService.query(TOY_KEY).then((toys) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      toys = toys.filter((toy) => regex.test(toy.txt))
    }
    if (filterBy.label) {
      // TODO : comple support label filtering
      toys = toys.filter((toy) => toy.labels.includes(filterBy.labels))
    }
    return toys
  })
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
    toys.push(_createToy('Piggy', 140 , ['Baby' , 'Doll'] , true))
    toys.push(_createToy('Soldier', 130 , ['Puzzle' , 'Doll' , 'Outdoor'] , true))
    toys.push(_createToy('Gun', 165 , ['Baby' , 'Doll'] , true))
    toys.push(_createToy('Alphabet cubes', 170 , ['Outdoor', 'Battery Powered', 'Doll'] , true))
    toys.push(_createToy('Beach ball', 125 , ['Outdoor' , 'Baby', 'Battery Powered'] , true))
    toys.push(_createToy('Doll', 270 , ['Puzzle' , 'Doll'] , true))
    toys.push(_createToy('Unicorn', 150 , ['Puzzle' , 'Battery Powered', 'Outdoor'] , true))

    localStorageService.saveToStorage(TOY_KEY, toys)
  }
}

function _createToy(name , price , labels , inStock) {
  const toy = getEmptyToy(name, price, labels , inStock)
  toy._id = utilService.makeId()
  return toy
}
