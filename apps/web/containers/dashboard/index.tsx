import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import API from '../../services/api.service';
import { APIS, getListRequestConfig } from '@utils/apis';
import HeaderComponent from '../../components/header';
import DashboardDataComponent from '../../components/dashboardData';

const DashboardContainer: FC<any> = () => {
  const [config, setConfig] = useState<any>(getListRequestConfig());
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadData(config);
  }, []);

  const loadData = async (config) => {
    const res = await API.post(APIS.DASHBOARD.USER_LIST, config);
    setData(res.data);
  };

  const updateData = (config) => {
    loadData(config);
    setConfig(config);
  }

  return (
    <div className={styles.page}>
      <HeaderComponent />
      {data && <DashboardDataComponent data={data} config={config} updateConfig={updateData} />}
    </div>
  );
};

export default DashboardContainer;
