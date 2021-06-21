import React, { Fragment, useState, useEffect, useRef } from 'react';
import styles from './index.less';
import { getPhotos } from '../../models/server';

const Index = ({ dataSource, ...props }) => {
  const scrollItem = useRef();
  const [allWidth, setAllWidth] = useState(94);
  useEffect(() => {
    const temp =
      scrollItem && scrollItem.current && scrollItem.current.offsetWidth;
    setAllWidth(parseInt(temp * 0.3));
  }, []);

  return (
    <div className={styles.bannerWrap}>
      <div className={styles.box}>
        <div className={styles.box_scroll} ref={scrollItem} id="scrollItem">
          {dataSource.map((item) => (
            <div
              className={styles.box_img}
              style={{ width: allWidth }}
              key={item.id}
            >
              <img key={item.id} src={item.url} />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`${styles.btn} ${styles.prev}`}
        onClick={() => {
          if (scrollItem.current.scrollLeft == 0) {
            return;
          }
          scrollItem.current.scrollLeft =
            scrollItem.current.scrollLeft -
            scrollItem.current.offsetWidth * 0.3 -
            15;
        }}
      >
        <div className={`${styles.btn_arrow}`}></div>
      </div>
      <div
        className={`${styles.btn} ${styles.next}`}
        onClick={() => {
          scrollItem.current.scrollLeft =
            scrollItem.current.scrollLeft + allWidth + 15;
        }}
      >
        <div className={`${styles.btn_arrow}`}></div>
      </div>
    </div>
  );
};
export default Index;
