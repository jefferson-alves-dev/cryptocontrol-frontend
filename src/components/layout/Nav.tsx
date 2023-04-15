import { FaUserCircle } from 'react-icons/fa';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <h2>Dashboard</h2>
      <div className={styles.nav_icons_container}>
        <FaUserCircle />
      </div>
    </nav>
  );
}
