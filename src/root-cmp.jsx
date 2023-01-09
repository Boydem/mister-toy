import './assets/css/main.css'

import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/app-header'
import { ToyIndex } from './views/toy-index'
import { UserProfile } from './views/user/user-profile'
import { store } from './store/store'
import { PageHero } from './cmps/page-hero'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className='app main-layout'>
          <AppHeader />
          <main className='main-content full main-layout'>
            <Routes>
              <Route path='/' element={<ToyIndex />} />
              <Route path='/user' element={<UserProfile />} />
              <Route path='/toy' element={<ToyIndex />} />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
