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
    if (`!${localStorage.ClientId}`) {
      localStorage.setItem("ClientId", new Date() - 0);
    }
    config.headers.ClientId = `${localStorage.ClientId}`;
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
          Vue.prototype.$message({
            message: err.message,
            type: "error"
          });
          console.log("ready to clear/..............");
          localStorage.setItem("USER_ID", "");
          localStorage.setItem("JWT_TOKEN", "");
          localStorage.setItem("loginUserName", "");
          localStorage.setItem("face","");
          localStorage.setItem("ROLE","");
          setTimeout(() => {
            window.location.href = "/";
          }, 2500);
          return ;

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
// const baseURL = "http://207.148.103.82:8080";
const baseURL = "";
// const baseURL = "http://10.0.46.20:8080";

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

const updateUserInfo = (uid, user) => {
  return axios.put(`${baseURL}/users/${uid}`, user);
};

const updateUserPwd = (uid, user) => {
  return axios.put(`${baseURL}/users/${uid}/pwd`, user);
};

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

const getEpisodeInfoByEpId = epId => {
  return axios.get(`${baseURL}/episodes/${epId}`);
};

const reVerifyEmail = ()=> {
  return axios.get(`${baseURL}/auth/emailReVerify`);
};

//评论API-------------------------------
const getRepliesByEpId = epId => {
  return axios.get(`${baseURL}/replies`, {
    params: {
      epId: epId
    }
  });
};

const getRepliesByEpIdAndPageNum = (epId, pn) => {
  return axios.get(`${baseURL}/replies`, {
    params: {
      epId: epId,
      pn: pn
    }
  });
};

const getSubReplies = (prid, pn) => {
  return axios.get(`${baseURL}/replies/son`, {
    params: {
      prid: prid,
      pn: pn
    }
  });
};

const addReply = data => {
  return axios.post(`${baseURL}/replies`, data);
};

const deleteReply = rid => {
  return axios.delete(`${baseURL}/replies/${rid}`);
};

const postActiontoReply = (rid, action) => {
  return axios.post(`${baseURL}/replies/like/${rid}/${action}`);
};
//评论API-------------------------------

const register = data => {
  return axios.post(`${baseURL}/users`, data);
};

const getNotices = (userId, type) => {
  return axios.get(`${baseURL}/messages/${userId}/type/${type}`);
};

const getNoticesBypn = (userId, type, pn) => {
  return axios.get(`${baseURL}/messages/${userId}/type/${type}`, {
    params: {
      pn: pn
    }
  });
};

const countUnreadMsg = userId => {
  return axios.get(`${baseURL}/messages/${userId}/countInfo`);
};

const getSpecificReply = rid => {
  return axios.get(`${baseURL}/replies`, {
    params: {
      rid: rid
    }
  });
};

const verifyEmail = (uid, key) => {
  return axios.get(`${baseURL}/auth/verify/uid/${uid}/key/${key}`);
};

const getUserInfoByUid = uid => {
  return axios.get(`${baseURL}/users/${uid}`);
};

const sendVideoMatchInfo = data => {
  return axios.post(`${baseURL}/videos/videoMatchInfo`, data);
};

const sendPostBangumi = data => {
  return axios.post(`${baseURL}/postBangumis`, data);
};

const updatePostBangumi = data => {
  return axios.put(`${baseURL}/postBangumis`, data);
};

const getUserPostBangumi = data => {
  return axios.get(`${baseURL}/postBangumis`, {
    params: data
  });
};

const updatePostBangumiThumb = data => {
  return axios.put(`${baseURL}/postBangumis/thumb`, data);
};

const deletePostBangumi = pbId => {
  return axios.delete(`${baseURL}/postBangumis/${pbId}`);
};

const matchVideoSuccess = data => {
  return axios.post(`${baseURL}/videos/matchSuccess`, data);
};

const getEpisodesByBid = bid => {
  return axios.get(`${baseURL}/episodes/bid/${bid}`);
};

const getBangumiById = bid => {
  return axios.get(`${baseURL}/bangumis/${bid}`);
};

const getMostViewBangumis = () => {
  return axios.get(`${baseURL}/bangumis/mostView`);
};

const searchBangumisByName = (name, pn, ps) => {
  return axios.get(`${baseURL}/bangumis`,{
    params: {
      bangumiName: name,
      pageNum: pn,
      pageSize: ps
    }
  })
};

const getNotice = () => {
  return axios.get(`${baseURL}/notices/showIndex`);
};

const getNoticeById = id => {
  return axios.get(`${baseURL}/notices/${id}`);
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
  updateUserInfo,
  getEpisodeInfoByEpId,
  getNotices,
  getNoticesBypn,
  countUnreadMsg,
  getSpecificReply,
  verifyEmail,
  getUserInfoByUid,
  sendVideoMatchInfo,
  sendPostBangumi,
  getUserPostBangumi,
  updatePostBangumi,
  updatePostBangumiThumb,
  deletePostBangumi,
  matchVideoSuccess,
  reVerifyEmail,
  updateUserPwd,
  getEpisodesByBid,
  getMostViewBangumis,
  getBangumiById,
  searchBangumisByName,
  getNotice,
  getNoticeById
};
