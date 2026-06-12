import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Навигация">
      {/* Логотип */}
      <div className={styles.logo}>
        <span className={styles.heart}>♥</span>
        <span className={styles.logoText}>Наша история</span>
      </div>

      {/* Только галерея */}
      <ul className={styles.links} role="list">
        <li>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              [styles.link, isActive ? styles.active : ""].join(" ")
            }
          >
            Галерея
          </NavLink>
        </li>
      </ul>

      {/* Иконки справа */}
      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          onClick={handleLogout}
          aria-label="Выйти"
          title="Выйти"
        >
          ⚙
        </button>
      </div>
    </nav>
  );
}
