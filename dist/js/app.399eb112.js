(function(e){function t(t){for(var a,s,o=t[0],c=t[1],u=t[2],p=0,d=[];p<o.length;p++)s=o[p],r[s]&&d.push(r[s][0]),r[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);l&&l(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(a=!1)}a&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},r={1:0},i=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},s.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=c;i.push([6,0]),n()})({"5Omr":function(e,t,n){"use strict";var a=n("6NtO"),r=n.n(a);r.a},6:function(e,t,n){e.exports=n("Vtdi")},"6NtO":function(e,t,n){},"6aQv":function(e,t,n){"use strict";var a=n("7nKv"),r=n.n(a);r.a},"7nKv":function(e,t,n){},EGO0:function(e,t,n){},Vtdi:function(e,t,n){"use strict";n.r(t);n("B1wg");var a=n("NeLz"),r=n("wxi0"),i=n.n(r),s=(n("UgMF"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("el-container",[n("el-header",[n("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":e.activeIndex,mode:"horizontal","background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"},on:{select:e.handleSelect}},[n("el-menu-item",{attrs:{index:"1"}},[n("router-link",{attrs:{to:"/"}},[n("i",{staticClass:"el-icon-menu"}),e._v("首页")])],1),n("el-menu-item",{attrs:{index:"2"}},[n("router-link",{attrs:{to:"/WatchVideo"}},[n("i",{staticClass:"el-icon-view"}),e._v("观看")])],1),n("el-popover",{attrs:{placement:"top",width:"160"},model:{value:e.showLogin,callback:function(t){e.showLogin=t},expression:"showLogin"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:!e.isLogin,expression:"!isLogin"}],staticClass:"loginGroup"},[n("el-input",{attrs:{placeholder:"账号"},model:{value:e.nameInput,callback:function(t){e.nameInput=t},expression:"nameInput"}}),n("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:e.passwordInput,callback:function(t){e.passwordInput=t},expression:"passwordInput"}}),n("el-checkbox",{model:{value:e.rememberMe,callback:function(t){e.rememberMe=t},expression:"rememberMe"}},[e._v("记住我")]),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){e.showLogin=!1}}},[e._v("取消")]),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.login}},[e._v("确定")])],1)],1),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isLogin,expression:"isLogin"}],staticClass:"loginedGroup"},[n("p",[e._v(" 已登录:"+e._s(e.loginUserName))]),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){e.showLogin=!1}}},[e._v("取消")]),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.logout}},[e._v("注销")])],1)]),n("el-button",{attrs:{slot:"reference",type:"primary",icon:"el-icon-setting",circle:""},slot:"reference"})],1)],1)],1),n("el-main",[n("router-view")],1)],1)],1)}),o=[],c=(n("k4Ii"),n("smdm")),u=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},l=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("img",{attrs:{src:"/static/building-space-1.png",alt:""}})])}],p={name:"HelloWorld",props:{msg:String}},d=p,h=(n("6aQv"),n("Yavw"),n("Lq4n")),m=Object(h["a"])(d,u,l,!1,null,"a6665a68",null),f=m.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"watchVideo Anime"},[n("div",{staticClass:"container"},[n("el-collapse",{staticClass:"dragArea",attrs:{accordion:""},model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[n("el-collapse-item",{attrs:{title:"请将番剧拖入此处",name:"1"}},[n("el-upload",{staticClass:"upload-demo",attrs:{drag:"",multiple:!1,"auto-upload":!1,"on-change":e.handleChange,action:"/"}},[n("i",{staticClass:"el-icon-upload"}),n("div",{staticClass:"el-upload__text"},[e._v("将番剧拖到此处，或\n            "),n("em",[e._v("点击打开")])])])],1),n("el-collapse-item",{directives:[{name:"show",rawName:"v-show",value:!e.hasInfo,expression:"!hasInfo"}],attrs:{title:"未能正确识别番剧,请手动输入搜索",name:"2"}},[n("div",{staticClass:"search"},[n("el-select",{attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"请输入番剧关键词","remote-method":e.remoteMethod,loading:e.loading},model:{value:e.searchBangumisId,callback:function(t){e.searchBangumisId=t},expression:"searchBangumisId"}},e._l(e.searchOption,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),n("el-select",{attrs:{filterable:"",placeholder:"请选择集数"},model:{value:e.episodeId,callback:function(t){e.episodeId=t},expression:"episodeId"}},e._l(e.episodeTotal,function(e){return n("el-option",{key:e,attrs:{label:e,value:e}})}))],1)])],1)],1),n("div",{staticClass:"playerWrapper playerWrapper-showAnim"},[n("div",{attrs:{id:"dplayer"}},[n("d-player",{ref:"player",attrs:{options:e.playerOpts}})],1)])])},v=[],b=0;function w(e){return x(I(y(e),8*e.length))}function k(e){for(var t,n=b?"0123456789ABCDEF":"0123456789abcdef",a="",r=0;r<e.length;r++)t=e.charCodeAt(r),a+=n.charAt(t>>>4&15)+n.charAt(15&t);return a}function y(e){for(var t=Array(e.length>>2),n=0;n<t.length;n++)t[n]=0;for(n=0;n<8*e.length;n+=8)t[n>>5]|=(255&e.charCodeAt(n/8))<<n%32;return t}function x(e){for(var t="",n=0;n<32*e.length;n+=8)t+=String.fromCharCode(e[n>>5]>>>n%32&255);return t}function I(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;for(var n=1732584193,a=-271733879,r=-1732584194,i=271733878,s=0;s<e.length;s+=16){var o=n,c=a,u=r,l=i;n=O(n,a,r,i,e[s+0],7,-680876936),i=O(i,n,a,r,e[s+1],12,-389564586),r=O(r,i,n,a,e[s+2],17,606105819),a=O(a,r,i,n,e[s+3],22,-1044525330),n=O(n,a,r,i,e[s+4],7,-176418897),i=O(i,n,a,r,e[s+5],12,1200080426),r=O(r,i,n,a,e[s+6],17,-1473231341),a=O(a,r,i,n,e[s+7],22,-45705983),n=O(n,a,r,i,e[s+8],7,1770035416),i=O(i,n,a,r,e[s+9],12,-1958414417),r=O(r,i,n,a,e[s+10],17,-42063),a=O(a,r,i,n,e[s+11],22,-1990404162),n=O(n,a,r,i,e[s+12],7,1804603682),i=O(i,n,a,r,e[s+13],12,-40341101),r=O(r,i,n,a,e[s+14],17,-1502002290),a=O(a,r,i,n,e[s+15],22,1236535329),n=L(n,a,r,i,e[s+1],5,-165796510),i=L(i,n,a,r,e[s+6],9,-1069501632),r=L(r,i,n,a,e[s+11],14,643717713),a=L(a,r,i,n,e[s+0],20,-373897302),n=L(n,a,r,i,e[s+5],5,-701558691),i=L(i,n,a,r,e[s+10],9,38016083),r=L(r,i,n,a,e[s+15],14,-660478335),a=L(a,r,i,n,e[s+4],20,-405537848),n=L(n,a,r,i,e[s+9],5,568446438),i=L(i,n,a,r,e[s+14],9,-1019803690),r=L(r,i,n,a,e[s+3],14,-187363961),a=L(a,r,i,n,e[s+8],20,1163531501),n=L(n,a,r,i,e[s+13],5,-1444681467),i=L(i,n,a,r,e[s+2],9,-51403784),r=L(r,i,n,a,e[s+7],14,1735328473),a=L(a,r,i,n,e[s+12],20,-1926607734),n=N(n,a,r,i,e[s+5],4,-378558),i=N(i,n,a,r,e[s+8],11,-2022574463),r=N(r,i,n,a,e[s+11],16,1839030562),a=N(a,r,i,n,e[s+14],23,-35309556),n=N(n,a,r,i,e[s+1],4,-1530992060),i=N(i,n,a,r,e[s+4],11,1272893353),r=N(r,i,n,a,e[s+7],16,-155497632),a=N(a,r,i,n,e[s+10],23,-1094730640),n=N(n,a,r,i,e[s+13],4,681279174),i=N(i,n,a,r,e[s+0],11,-358537222),r=N(r,i,n,a,e[s+3],16,-722521979),a=N(a,r,i,n,e[s+6],23,76029189),n=N(n,a,r,i,e[s+9],4,-640364487),i=N(i,n,a,r,e[s+12],11,-421815835),r=N(r,i,n,a,e[s+15],16,530742520),a=N(a,r,i,n,e[s+2],23,-995338651),n=C(n,a,r,i,e[s+0],6,-198630844),i=C(i,n,a,r,e[s+7],10,1126891415),r=C(r,i,n,a,e[s+14],15,-1416354905),a=C(a,r,i,n,e[s+5],21,-57434055),n=C(n,a,r,i,e[s+12],6,1700485571),i=C(i,n,a,r,e[s+3],10,-1894986606),r=C(r,i,n,a,e[s+10],15,-1051523),a=C(a,r,i,n,e[s+1],21,-2054922799),n=C(n,a,r,i,e[s+8],6,1873313359),i=C(i,n,a,r,e[s+15],10,-30611744),r=C(r,i,n,a,e[s+6],15,-1560198380),a=C(a,r,i,n,e[s+13],21,1309151649),n=C(n,a,r,i,e[s+4],6,-145523070),i=C(i,n,a,r,e[s+11],10,-1120210379),r=C(r,i,n,a,e[s+2],15,718787259),a=C(a,r,i,n,e[s+9],21,-343485551),n=R(n,o),a=R(a,c),r=R(r,u),i=R(i,l)}return Array(n,a,r,i)}function _(e,t,n,a,r,i){return R(S(R(R(t,e),R(a,i)),r),n)}function O(e,t,n,a,r,i,s){return _(t&n|~t&a,e,t,r,i,s)}function L(e,t,n,a,r,i,s){return _(t&a|n&~a,e,t,r,i,s)}function N(e,t,n,a,r,i,s){return _(t^n^a,e,t,r,i,s)}function C(e,t,n,a,r,i,s){return _(n^(t|~a),e,t,r,i,s)}function R(e,t){var n=(65535&e)+(65535&t),a=(e>>16)+(t>>16)+(n>>16);return a<<16|65535&n}function S(e,t){return e<<t|e>>>32-t}var B=function(e,t){var n=this,a="",r=new FileReader,i=new FileReader;this.setBinAndHash=function(e,t){switch(e){case 0:this._binStart=t;break;case 1:this._binEnd=t}this._binStart&&this._binEnd&&this.md5sum(this._binStart,this._binEnd)},this.md5sum=function(e,t){this._hash=k(w(e+t)),a(this._hash)},this.getHash=function(){return this._hash},this.calculateHashOfFile=function(e){r.onload=function(e){n.setBinAndHash(0,e.target.result)},i.onload=function(e){n.setBinAndHash(1,e.target.result)};var t=e.slice(0,65536),a=e.slice(e.size-65536,e.size);r.readAsBinaryString(t),i.readAsBinaryString(a)},this.calculateHashOfFile(e),a=t},j=B,A=n("P0lv"),T=n.n(A),U=(n("Umu7"),n("f0Pt")),E=n.n(U);E.a.interceptors.request.use(function(e){return localStorage.JWT_TOKEN&&(e.headers.Authorization="".concat(localStorage.JWT_TOKEN)),e},function(e){return Promise.reject(e)}),E.a.interceptors.response.use(function(e){return e},function(e){if(e&&e.response){switch(e.response.status){case 403:e.message=e.response.data.msg;break;case 404:e.message="请求地址出错: ".concat(e.response.config.url);break;case 408:e.message="请求超时";break;case 500:e.message="服务器内部错误";break;default:e.message=e.response.data.msg;break}a["default"].prototype.$message({message:e.message,type:"error"})}return Promise.reject(e)});var V="",W=function(e){return E.a.post("".concat(V,"/auth/login"),e)},z=function(){return E.a.get("".concat(V,"/auth/logout"))},M=function(e){return E.a.get("".concat(V,"/tokens"),e)},$=function(e,t){return E.a.get("".concat(V,"/videos/").concat(e,"/").concat(t))},F=function(e,t){return E.a.get("".concat(V,"/episodes"),{params:{bangumiId:e,epIndex:t}})},K=function(e){return E.a.get("".concat(V,"/bangumis"),{params:{bangumiName:e}})},P={login:W,logout:z,checkToken:M,getVideosInfo:$,getDanmakujiIdByBangumisIdAndepIndex:F,getsearchBangumisIdResult:K},D={data:function(){var e=this;return{episodeId:"",episodeTotal:0,searchOption:[],searchBangumisId:[],list:[],loading:!1,states:[],hasInfo:!0,searchInput:"",activeNames:["1"],videoInput:"",videoURL:"",playerOpts:{autoplay:!0,theme:"#FADFA3",lang:"zh-cn",screenshot:!0,hotkey:!0,preload:"auto",volume:.7,mutex:!0,video:{url:this.videoURL,pic:"/static/placeholder.png",thumbnails:"thumbnails.jpg",type:"auto"},subtitle:{url:"dplayer.vtt",type:"webvtt",fontSize:"25px",bottom:"10%",color:"#b7daff"},danmaku:{id:"9E2E3368B56CDBB4",api:"https://api.prprpr.me/dplayer/",token:"tokendemo",maximum:1e3,addition:["https://api.prprpr.me/dplayer/bilibili?aid=4157142"],user:"DIYgod",bottom:"15%",unlimited:!0},contextmenu:[{text:"custom1",link:"https://github.com/DIYgod/DPlayer"},{text:"custom2",click:function(t){e.tap(t)}}]}}},components:{"d-player":T.a},watch:{searchBangumisId:function(e){var t=this.states.filter(function(t){return t.bangumiId==e});0==t.length?this.episodeTotal=0:this.episodeTotal=t[0].episodeTotal},episodeId:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(t){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,P.getDanmakujiIdByBangumisIdAndepIndex(this.searchBangumisId,t);case 2:n=e.sent,a=n.data.danmakuId,this.switchVideo(this.videoURL,a);case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},methods:{play:function(){this.tap("play callback"),this.tap(this.videoURL)},getFileMd5:function(e){return new Promise(function(t,n){try{new j(e,function(e){t(e)})}catch(e){n(e)}})},handleChange:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(t){var n,a,r,i,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.videoURL=t.url,e.next=3,this.getFileMd5(t.raw);case 3:return n=e.sent,a=t.size,this.tap(n),this.tap(a),this.switchVideo(this.videoURL,""),e.next=10,P.getVideosInfo(a,n);case 10:r=e.sent.data,this.tap(r),i=r.data,"0"===r.code||"OK"===r.msg?(s=i.danmakuId,this.switchVideo(this.videoURL,s)):(this.hasInfo=!1,this.activeNames=["2"]);case 14:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),switchVideo:function(e,t){var n=this.$refs.player.dp;n.switchVideo({url:this.videoURL},{id:t,api:"http://api.echisan.cn/dplayer/",token:"tokendemo",maximum:1e3,user:"DIYgod",bottom:"15%",unlimited:!0})},remoteMethod:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(""===t){e.next=10;break}return this.loading=!0,this.tap(t),e.next=5,P.getsearchBangumisIdResult(t);case 5:n=e.sent.data,this.loading=!1,"0"!==n.code&&"OK"!==n.msg||(this.states=n.data,this.list=this.states.map(function(e){return{value:e.bangumiId,label:e.bangumiName}}),this.searchOption=this.list.filter(function(e){return e.label.toLowerCase().indexOf(t.toLowerCase())>-1})),e.next=11;break;case 10:this.searchOption=[];case 11:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},mounted:function(){setTimeout(function(){document.getElementsByClassName("watchVideo")[0].setAttribute("class","watchVideo")},1e3)}},H=D,J=(n("5Omr"),Object(h["a"])(H,g,v,!1,null,null,null)),Y=J.exports,G={name:"app",components:{HelloWorld:f,WatchVideo:Y},data:function(){return{showLogin:!1,nameInput:"",passwordInput:"",rememberMe:!1,activeIndex:"1",isLogin:!1,loginUserName:""}},methods:{handleSelect:function(e,t){this.tap(e,t)},login:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(){var t,n,a,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t={principal:this.nameInput,password:this.passwordInput,remember_me:this.rememberMe?1:0},""!=t.principal&&""!=t.password){e.next=4;break}return this.$message({message:"账号或密码为空",type:"info"}),e.abrupt("return",!1);case 4:return e.next=6,P.login(t);case 6:if(n=e.sent,a=n.data,r="",2002!==a.code&&null!=a.data){e.next=12;break}return this.$message({message:"账号不存在或密码错误",type:"error"}),e.abrupt("return",!1);case 12:0!==a.code&&"OK"!==a.msg||(r=a.data.token,this.isLogin=!0,this.loginUserName=t.principal,r||this.$message({message:"无法获取到Token",type:"error"})),this.checkLocalStorage()&&(localStorage.setItem("JWT_TOKEN",r),localStorage.setItem("loginUserName",this.loginUserName));case 14:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),checkLocalStorage:function(){return"undefined"!==typeof window.localStorage||(this.$message({message:"请关闭隐私模式,或者浏览器太老旧了,否则无法保存登录状态",type:"warning"}),!1)},logout:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,P.logout();case 2:t=e.sent,0!==t.data.code&&"登出成功"!==t.data.msg||(this.isLogin=!1,localStorage.setItem("JWT_TOKEN",""),localStorage.setItem("loginUserName",""));case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},mounted:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(){var t,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!this.checkLocalStorage()){e.next=10;break}if(t=localStorage.getItem("loginUserName"),n=localStorage.getItem("JWT_TOKEN"),null!=n&&""!=n){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,P.checkToken(n);case 7:a=e.sent,this.tap(a.data),0!==a.data.code&&"ojbk"!==a.data.msg||(this.isLogin=!0,this.loginUserName=t);case 10:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},q=G,Q=(n("ZL7j"),Object(h["a"])(q,s,o,!1,null,null,null)),Z=Q.exports,X=n("uOVN");a["default"].use(X["a"]);var ee=[{path:"/",name:"HelloWorld",component:f},{path:"/WatchVideo",name:"WatchVideo",component:Y}],te=new X["a"]({routes:ee}),ne=te;a["default"].config.productionTip=!1,a["default"].use(i.a),a["default"].prototype.tap=function(e){return console.log(e),e},new a["default"]({render:function(e){return e(Z)},router:ne}).$mount("#app")},Yavw:function(e,t,n){"use strict";var a=n("c1Uo"),r=n.n(a);r.a},ZL7j:function(e,t,n){"use strict";var a=n("EGO0"),r=n.n(a);r.a},c1Uo:function(e,t,n){}});
//# sourceMappingURL=app.399eb112.js.map