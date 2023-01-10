import { Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/app-header'
import { ToyIndex } from './views/toy-index'

import { ToyDetails } from './views/toy-details'
import { ToyEdit } from './views/toy-edit'

export function App() {
  return (
    <section className='app'>
      <AppHeader />
      <main className='main-content'>
        <Routes>
          <Route path='/toy/:toyId' element={<ToyDetails />} />
          <Route element={<ToyEdit />} path='/toy/edit/:toyId' />
          <Route element={<ToyEdit />} path='/toy/edit' />
          {/* <Route path='/user' element={<UserProfile />} /> */}
          <Route path='/toy' element={<ToyIndex />} />
          <Route path='/' element={<ToyIndex />} />
        </Routes>
      </main>
    </section>
  )
}
