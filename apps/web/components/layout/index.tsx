import Head from 'next/head';
import { FC } from 'react';
import styles from './index.module.scss';

const LayoutComponent: FC<any> = ({ title, noLayout, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.png" />
      </Head>
      {noLayout && <>{children}</>}
      {!noLayout && <main className={styles.layout}>{children}</main>}
    </>
  );
};

export default LayoutComponent;
