import React, { Fragment, useState, useEffect, useRef } from 'react';
import styles from './index.less';
import { Loading, TabButton, Banner } from './components'
import InfoCard from './components/infoCard';
import { getPhotos } from './models/server'

const IndexPage = ({...props}) => {
  const [load, setLoad] = useState(true); // 是否是加载状态
  const [list, setList] = useState([]);
  useEffect(() => {
    initData()
  }, [])
  const initData = () => {
    getPhotos().then(res => {
      setList([...res]);
      setLoad(false)
    })
  }
  return (
    <Loading loading={load}>
      <div className={styles.wrap}>
        <InfoCard />
        <div className={styles.text}>
          Lorem ipsum dummy text. Lorem isum not just dummy text
        </div>
        <TabButton />
        <Banner dataSource={list}/>
      </div>
    </Loading>
  );
}
export default IndexPage;
