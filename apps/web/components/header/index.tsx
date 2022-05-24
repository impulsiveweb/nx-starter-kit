import router from 'next/router';
import { FC } from 'react';
import styles from './index.module.scss';

const HeaderComponent: FC<any> = () => {

  return (
    <div className={styles.header}>
      <div className={styles.logo}>NX-Starter Kit</div>
      <div className={styles.navigation}>
        <ul>
          <li onClick={() => router.push('/login')}>
            Login
          </li>
          <li onClick={() => router.push('/register')}>
            Register
          </li>
        </ul>
      </div>

    </div>
  );
}

export default HeaderComponent;