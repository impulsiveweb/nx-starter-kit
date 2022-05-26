import { useAuth } from '../../context/login';
import router from 'next/router';
import { FC, useState } from 'react';
import styles from './index.module.scss';

const HeaderComponent: FC<any> = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className={styles.header}>
      <div className={styles.logo}>NX-Starter Kit </div>
      <div className={styles.navigation}>
        <ul className={styles.menu}>
          {!isAuthenticated && (
            <>
              <li onClick={() => router.push('/login')}>Login</li>
              <li onClick={() => router.push('/register')}>Register</li>
            </>
          )}
        </ul>
        {isAuthenticated && (
          <>
            <div className={styles.user} onClick={() => setDropdownOpen(true)}>
              <div className={styles.name}>
                {user.first_name} {user.last_name}
              </div>
              <div className={styles.email}>{user.email}</div>
            </div>
            {dropdownOpen && (
              <div className={styles.dropdown}>
                <div className={styles.overlay} onClick={() => setDropdownOpen(false)}></div>
                <ul className={styles.elements}>
                  <li onClick={() => logout()}>Logout</li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
