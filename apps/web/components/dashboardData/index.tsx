import { useAuth } from '../../context/login';
import router from 'next/router';
import { FC, useState } from 'react';
import styles from './index.module.scss';

const DashboardDataComponent: FC<any> = ({ 
  data
}) => {
  
  return (
    <div className={styles.header}>
      {JSON.stringify(data)}
    </div>
  );
};

export default DashboardDataComponent;
