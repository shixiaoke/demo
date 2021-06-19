import React, { Fragment, useState, useEffect, useRef } from 'react';
import style from './index.less';


const Index = ({...props}) => {
  const [current, setCurrent] = useState(1);
  const list = [
    {
      name: 'Available Items',
      key: 1,
    },
    {
      name: 'Information One',
      key: 2,
    },
  ];
  return (
    <div className={style.tabWrap}>
      {list.map((item, index) => (
        <Fragment key={item.key}>
          <span
            className={`${style.item} ${item.key == current ? style.active : ''}`}
            onClick={() => {
              setCurrent(item.key)
            }}
          >
            {item.name}
          </span>
          <span className={style.line}></span>
        </Fragment>
      ))}

    </div>
  );
}
export default Index;
