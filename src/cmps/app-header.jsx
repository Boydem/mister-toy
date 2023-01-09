import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/imgs/logo/logo.png'

export function AppHeader() {
  return (
    <section className='app-header full main-layout'>
      <div className='wrapper'>
        <div className='logo'>
          <img className='app-logo' src={logo} />
        </div>
        <nav className='main-nav'>
          <ul>
            <li>
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'/toy'}>Toy</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  )
}
