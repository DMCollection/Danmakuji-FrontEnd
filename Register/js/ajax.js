function ajaxPost(url, data, callback) {
  this.url = url;
  this.data = data;
  this.postData = this.dataFormat(data);
  this.xhr = this.createXMLHTTPRequest();
  // this.post(url, this.postData, callback);
  try {
    this.post(url, this.postData, callback);
  } catch (error) {
    // throw new Error("fail post : " + error);
    this.tap(error);
  }
}
ajaxPost.prototype = {
  constructor: ajaxPost,
  createXMLHTTPRequest: createXMLHTTPRequest,
  dataFormat: dataFormat,
  post: post
};

function $(ele) {
  if (typeof ele === "string") {
    let selectAttr = ele[0];
    let selectName = ele.slice(1);

    if (selectAttr === ".") {
      return document.getElementsByClassName(selectName);
    } else if (selectAttr === "#") {
      return document.getElementById(selectName);
    }
  }
}

function createXMLHTTPRequest() {
  var xmlHttpRequest;
  if (window.XMLHttpRequest) {
    xmlHttpRequest = new XMLHttpRequest();

    if (xmlHttpRequest.overrideMimeType) {
      xmlHttpRequest.overrideMimeType("text/xml");
    }
  } else if (window.ActiveXObject) {
    var activexName = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
    for (var i = 0; i < activexName.length; i++) {
      try {
        xmlHttpRequest = new ActiveXObject(activexName[i]);
        if (xmlHttpRequest) {
          break;
        }
      } catch (e) {
        throw e;
      }
    }
  }
  return xmlHttpRequest;
}

function dataFormat(data) {
  if (typeof data == "object") {
    let str = "";
    for (var key in data) {
      str += key + "=" + data[key] + "&";
    }
    data = str.replace(/&$/, "");
  }
  return data;
}

function post(url, data, Callback) {
  let req = this.xhr;
  if (req) {
    req.open("POST", url, true);
    req.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=utf-8;"
    );
    req.send(dataFormat(data));
    req.onreadystatechange = function() {
      if (req.readyState == 4) {
        if ((req.status >= 200 && req.status < 300) || req.status == 304) {
          Callback(req.responseText);
        } else {
          Callback("fail");
        }
      }
    };
  }
}

function tap(x) {
  console.log(x);
  return x;
}
