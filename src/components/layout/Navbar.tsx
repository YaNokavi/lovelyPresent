import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/authStore'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { to: '/home',        label: 'Home' },
  { to: '/our-journey', label: 'Our Journey' },
  { to: '/gallery',     label: 'Gallery' },
  { to: '/letters',     label: 'Letters' },
  { to: '/about-us',    label: 'About Us' },
]

export default function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      {/* Логотип */}
      <div className={styles.logo}>
        <span className={styles.heart}>♥</span>
        <span className={styles.logoText}>Our Story</span>
      </div>

      {/* Ссылки */}
      <ul className={styles.links} role="list">
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                [styles.link, isActive ? styles.active : ''].join(' ')
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Иконки справа */}
      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          aria-label="Music"
          title="Music"
        >
          ♪
        </button>
        <button
          className={styles.iconBtn}
          onClick={handleLogout}
          aria-label="Logout"
          title="Log out"
        >
          ⚙
        </button>
      </div>
    </nav>
  )
}
