import { FC } from 'react';
import styles from './index.module.scss';

interface PaginationProps {
  count: number;
  limit: number;
  active: number;
  showFirstLast: boolean;
  onChange: (n) => void;
}

const PaginationComponent: FC<PaginationProps> = ({
  count,
  limit,
  active,
  showFirstLast,
  onChange,
}) => {
  const previous_btn = true,
    next_btn = true,
    first_btn = showFirstLast ? showFirstLast : true,
    last_btn = showFirstLast ? showFirstLast : true;

  let start_loop = 0;
  let end_loop = 0;
  const no_of_paginations = Math.ceil(count / limit);

  if (active >= 7) {
    start_loop = active - 3;
    if (no_of_paginations > active + 3) end_loop = active + 3;
    else if (active <= no_of_paginations && active > no_of_paginations - 6) {
      start_loop = no_of_paginations - 6;
      end_loop = no_of_paginations;
    } else {
      end_loop = no_of_paginations;
    }
  } else {
    start_loop = 1;
    if (no_of_paginations > 7) end_loop = 7;
    else end_loop = no_of_paginations;
  }
  const buttons = Array(...new Array(end_loop + 1 - start_loop));
  return (
    <div className={styles.paginate}>
      <div className={styles.paginate_summary}>
        <div>
          Page <strong>{active}</strong> of <strong>{no_of_paginations}</strong>{' '}
          Pages{' '}
          <span>
            Total Records <strong>{count}</strong>
          </span>
        </div>
      </div>
      <div className={styles.paginate_action}>
        <ul className={styles.paginate_pagination}>
          {first_btn && active > 1 ? (
            <li onClick={() => onChange(1)} className={styles.active}>
              <span>First</span>
            </li>
          ) : first_btn ? (
            <li className={styles.inactive}>
              <span>First</span>
            </li>
          ) : (
            ''
          )}
          {previous_btn && active > 1 ? (
            <li onClick={() => onChange(active - 1)} className={styles.active}>
              <span>Prev</span>
            </li>
          ) : first_btn ? (
            <li className={styles.inactive}>
              <span>Prev</span>
            </li>
          ) : (
            ''
          )}
          {buttons.map((x, n) => {
            const i = start_loop + n;
            if (active == i)
              return (
                <li className={`${styles.inactive} ${styles.current}`} key={n}>
                  <span>{i}</span>
                </li>
              );
            else
              return (
                <li
                  onClick={() => onChange(i)}
                  className={styles.active}
                  key={n}
                >
                  <span>{i}</span>
                </li>
              );
          })}
          {next_btn && active < no_of_paginations ? (
            <li onClick={() => onChange(active + 1)} className={styles.active}>
              <span>Next</span>
            </li>
          ) : next_btn ? (
            <li className={styles.inactive}>
              <span>Next</span>
            </li>
          ) : (
            ''
          )}
          {last_btn && active < no_of_paginations ? (
            <li
              onClick={() => onChange(no_of_paginations)}
              className={styles.active}
            >
              <span>Last</span>
            </li>
          ) : last_btn ? (
            <li className={styles.inactive}>
              <span>Last</span>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </div>
  );
};

export default PaginationComponent;
