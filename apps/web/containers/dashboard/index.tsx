import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import API from '../../services/api.service';
import { APIS } from '@utils/apis';
import HeaderComponent from '../../components/header';
import DashboardDataComponent from '../../components/dashboardData';

const DashboardContainer: FC<any> = () => {

  const [data, setData] = useState<any>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await API.post(APIS.DASHBOARD.USER_LIST, {});
    setData(data);
    console.log("API DATA", data);
  }

  return (
    <div className={styles.page}>
      <HeaderComponent />
      <DashboardDataComponent data={data} />
    </div>
  );
};

export default DashboardContainer;
