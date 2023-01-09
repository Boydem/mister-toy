import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { localStorageService } from './storage.service.js'

const USER_KEY = 'userDB'
_createUsers()

export const userService = {
  get,
  remove,
  signup,
  login,
  logout,
  update,
  getEmptyCredentials,
  getLoggedinUser,
  addActivity
}

function get(userId) {
  return storageService.get(USER_KEY, userId)
}

function update(user) {
  return storageService.put(USER_KEY, user).then((user) => {
    _saveLoggedinUser(user)
    return user
  })
}

function remove(userId) {
  return storageService.remove(USER_KEY, userId)
}

function signup(credentials) {
  return storageService.post(USER_KEY, credentials).then((user) => {
    _saveLoggedinUser(user)
    return user
  })
}

function login(credentials) {
  return storageService.query(USER_KEY).then((users) => {
    const user = users.find((u) => u.username === credentials.username)
    if (!user) return Promise.reject('Login failed')
    _saveLoggedinUser(user)
    return user
  })
}

function getEmptyCredentials(
  fullname = '',
  username = '',
  password = 'secret',
  prefs = { color: '#000000', bgColor: '#ffffff' }
) {
  return {
    fullname,
    username,
    password,
    prefs,
    activities: [],
  }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem('loggedinUser') || null)
}

function logout() {
  sessionStorage.removeItem('loggedinUser')
  return Promise.resolve()
}

function addActivity(activity) {
  const loggedInUser = getLoggedinUser()
  if (!loggedInUser) return

  get(loggedInUser._id)
    .then(user => {
      activity._id = utilService.makeId()
      user.activities.unshift(activity)
      return update(user)
    })
    .catch((err) => {
      console.error('Cannot add activitie:', err)
      throw err
    })
}

function _saveLoggedinUser(user) {
  sessionStorage.setItem('loggedinUser', JSON.stringify(user))
}

function _createUsers() {
  let users = localStorageService.loadFromStorage(USER_KEY)
  if (!users || !users.length) {
    users = []
    users.push(_createUser('Muki Da', 'muki'))
    users.push(_createUser('Puki Ba', 'puki'))

    localStorageService.saveToStorage(USER_KEY, users)
  }
}

function _createUser(fullname, username, password) {
  const user = getEmptyCredentials(fullname, username, password)
  user._id = utilService.makeId()
  return user
}
