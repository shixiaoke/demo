import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

axios.defaults.timeout = 600000;
// axios.defaults.baseURL = URL.apiurl_one;
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';

// ---------------------------------（解决重复点击事件的问题）start----------------------
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = ever => {
  for (let p in pending) {
    if (pending[p].u === ever.url + '&' + ever.method) {
      //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
};
// ---------------------------------（解决重复点击事件的问题）end------------------------

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 序列化
    if (config.headers['Content-Type'] != 'multipart/form-data') {
      config.data = qs.stringify(config.data);
    }
    // -----在一个ajax发送前执行一下取消操作-------------------------------------------------------
    removePending(config);
    config.cancelToken = new cancelToken(c => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ u: config.url + '&' + config.method, f: c });
    });
    // -----------------------------------------------------------------------------------------
    return config;
  },
  error => {
    message.error(error);
    return error;
  },
);

// 添加响应拦截器
axios.interceptors.response.use(
  res => {
    // ------------------------------------------------------------------------------------------
    removePending(res.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    // ------------------------------------------------------------------------------------------
    const data = res.data;
    if (
      data.status === 200 ||
      data.status === 401 ||
      data.status === 402
    ) {
      return Promise.resolve(res);
    } else {
      // 后台返回非200状态码做错误提示
      // message.warning(data.message);
      return Promise.resolve(res);
    }
  },
  error => {
    if (String(error) === 'Error: timeout of 60000ms exceeded') {
      message.warning('请求超时！');
    } else if (String(error) === 'Error: Network Error') {
      // message.error("网络出错！")
    }
    return Promise.reject(error);
  },
);

function axiosBase(url, type, params) {
  if (!params) params = {};

  let export_name;
  let axiosMain;
  if (type.toUpperCase() === 'GET') {
    axiosMain = axios.get(url, {
      params: params,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
      },
    });
  } else if (type.toUpperCase() === 'POST') {
    axiosMain = axios.post(url, params, {
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
      },
    });
  } else if (type.toUpperCase() === 'PUT') {
    let id = params.id;
    delete params['id'];
    axiosMain = axios.put(`${url}/${id}`, params, {
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
      },
    });
  } else if (type.toUpperCase() === 'PATCH') {
    let id = params.id;
    delete params['id'];
    axiosMain = axios.patch(`${url}/${id}`, params, {
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
      },
    });
  } else if (type.toUpperCase() === 'DELETE') {
    let id = params.id;
    delete params['id'];
    axiosMain = axios.delete(`${url}/${id}`, {
      params: params,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
      },
    });
  } else if (type.toUpperCase() === 'OPEN') {
    return window.open(`${url}`);
  }
  return axiosMain
    .then(res => {
      if (type.toUpperCase() !== 'DOWNLOAD') {
        return res.data;
      } else {
        let date = `${new Date().getFullYear()}-${new Date().getMonth() +
          1}-${new Date().getDate()}`;
        let blob = new Blob([res.data], {
          type: 'application/x-xlsx',
        });
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = `${export_name}_${date}.xlsx`;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        return {
          status_code: 200,
          data: [],
          msg: ``,
        };
      }
      // return res
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

// 对axios的实例重新封装成一个plugin
export default axiosBase;
