import { FC } from 'react';
import styles from './index.module.scss';

const FooterComponent: FC<any> = () => {

  return (
    <div className={styles.footer}>
      <div className={styles.company}>ImpulsiveWeb Private Limited &copy; 2022</div>
    </div>
  );
}

export default FooterComponent;