import React, { Fragment, useState, useEffect, useRef } from 'react';
import styles from './index.less';

const LoadPage = ({loading, ...props}) => {
  return (
    <div className={styles.infoWrap}>
        <div className={styles.item}>
            <span className={styles.logo}>T</span>
            <span className={styles.menu}>
                <span className={styles.menu_line1}></span>
                <span className={styles.menu_line2}></span>
            </span>
        </div>
        <div className={styles.item}>
            <div className={styles.item_content}>
                <span className={styles.title}>Product Items Summary</span>
                <span className={styles.name} style={{ color: 'orange' }}>Deposited</span>
                <span className={styles.money}>$2500.00</span>
                <span className={styles.name}>Deposited</span>
                <span className={styles.money}>$2500.00</span>
            </div>
            <div className={styles.item_pie}></div>
        </div>
    </div>
  );
}
export default LoadPage;