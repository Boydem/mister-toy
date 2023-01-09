import './assets/css/main.css'

import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/app-header'
import { ToyIndex } from './views/toy-index'
import { UserProfile } from './views/user/user-profile'

export function App() {
  return (
    // <Provider store={store}>
    <Router>
      <section className='app'>
        <AppHeader />
        {/* <SideBar /> */}
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<ToyIndex />} />
            <Route path='/user' element={<UserProfile />} />
            <Route path='/toy' element={<ToyIndex />} />
          </Routes>
        </main>
      </section>
    </Router>
    // </Provider>
  )
}

