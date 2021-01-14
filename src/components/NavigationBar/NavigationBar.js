import { NavLink } from 'react-router-dom';
import styles from './NavigationBar.module.css';

const NavigationBar = () => (
  <header className={styles.header}>
    <nav>
      <NavLink
        exact
        to="/"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Home
      </NavLink>

      <NavLink
        to="/movies"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Movies
      </NavLink>
    </nav>
  </header>
);

export default NavigationBar;
