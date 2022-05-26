import { FC, } from 'react';
import styles from './index.module.scss';
import PaginationComponent from '../pagination';

const DashboardDataComponent: FC<any> = ({ data, config, updateConfig }) => {
  console.log('data', data);
  return (
    <div className={styles.data}>
      <div className={styles.data_table}>
        <ul className={styles.header}>
          <li>ID</li>
          <li>First Name</li>
          <li>Last Name</li>
          <li>Email</li>
          <li>Mobile</li>
        </ul>
        {data.rows.map((row: any, index: number) =><ul className={styles.row} key={index}>
          <li>{row.id}</li>
          <li>{row.first_name}</li>
          <li>{row.last_name}</li>
          <li>{row.email}</li>
          <li>{row.mobile}</li>
        </ul>)}
      </div>
      <PaginationComponent
        count={56}
        limit={10}
        active={1}
        onChange={(page) =>
          updateConfig(Object.assign({}, config, { page: page }))
        }
        showFirstLast={false}
      />
    </div>
  );
};

export default DashboardDataComponent;
