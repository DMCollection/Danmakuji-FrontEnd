import axios from "axios";

import Vue from "vue";
// import qs from 'qs'; //此模块用于转成Form Data 格式

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.JWT_TOKEN) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${localStorage.JWT_TOKEN}`;
    }
    if(`!${localStorage.ClientId}`){
      localStorage.setItem("ClientId",(new Date()-0));
    };
    config.headers.ClientId = `${localStorage.ClientId}`;
    console.log("client-id:",`${localStorage.ClientId}`);
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);


// http响应拦截器
axios.interceptors.response.use(
  data => {
    // 响应成功关闭loading
    return data;
  },
  err => {
    // 这里是返回状态码不为200时候的错误处理
    if (err && err.response) {
      switch (err.response.status) {
        case 403:
          err.message = err.response.data.msg;
          break;

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;

        case 408:
          err.message = "请求超时";
          break;

        case 500:
          err.message = "服务器内部错误";
          break;
        default:
          err.message = err.response.data.msg;
          break;
      }
      Vue.prototype.$message({
        message: err.message,
        type: "error"
      });
    }

    return Promise.reject(err);
  }
);

//本地开发请设置为"/api"
const baseURL = "http://10.0.46.20:8080";
// const baseURL = "/api";

//  登录相关
const login = data => {
  return axios.post(`${baseURL}/auth/login`, data);
};
const logout = () => {
  return axios.get(`${baseURL}/auth/logout`);
};

const checkToken = token => {
  return axios.get(`${baseURL}/tokens`, token);
};

const updateUserInfo = (uid,user) =>{
  return axios.put(`${baseURL}/users/${uid}`,user);
}

const getVideosInfo = (fileSize, vMd5) => {
  return axios.get(`${baseURL}/videos/${fileSize}/${vMd5}`);
};
const getDanmakujiIdByBangumisIdAndepIndex = (bangumiId, epIndex) => {
  return axios.get(`${baseURL}/episodes`, {
    params: {
      bangumiId: bangumiId,
      epIndex: epIndex
    }
  });
};
const getsearchBangumisIdResult = query => {
  return axios.get(`${baseURL}/bangumis`, {
    params: {
      bangumiName: query
    }
  });
};

//评论API-------------------------------
const getRepliesByEpId = epId => {
  return axios.get(`${baseURL}/replies`,{
    params:{
      epId:epId
    }
  });
};

const getRepliesByEpIdAndPageNum = (epId,pn) => {
  return axios.get(`${baseURL}/replies`,{
    params:{
      epId:epId,
      pn:pn
    }
  });
};

const getSubReplies = (prid,pn) => {
  return axios.get(`${baseURL}/replies/son`,{
    params:{
      prid: prid,
      pn: pn
    }
  });
};

const addReply = data => {
  return axios.post(`${baseURL}/replies`,data);
};

const deleteReply = rid =>{
  return axios.delete(`${baseURL}/replies/${rid}`);
};

const postActiontoReply = (rid,action) =>{
  return axios.post(`${baseURL}/replies/like/${rid}/${action}`);
};
//评论API-------------------------------

const register = data => {
    return axios.post(`${baseURL}/users`,data)
};

export default {
  login,
  logout,
  checkToken,
  getVideosInfo,
  getDanmakujiIdByBangumisIdAndepIndex,
  getsearchBangumisIdResult,
  getRepliesByEpId,
  getRepliesByEpIdAndPageNum,
  addReply,
  deleteReply,
  postActiontoReply,
  getSubReplies,
  register,
  updateUserInfo
};
