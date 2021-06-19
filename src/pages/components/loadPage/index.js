import React, { Fragment, useState, useEffect, useRef } from 'react';
import styles from './index.less';

const LoadPage = ({loading, ...props}) => {
  return (
    <Fragment>
      {loading ?
        <div className={styles.loadBox}>Loading...</div>
        :
        <div className={styles.wrap}>
            {props.children}
        </div>
      }
    </Fragment>
  );
}
export default LoadPage;
