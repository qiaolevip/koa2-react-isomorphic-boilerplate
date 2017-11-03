import Promise from 'es6-promise';

let urlParams = (params) => {
  return Object.keys(params).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
  }).join('&');
};

export default (obj) => {

  var url = obj, type = 'GET', isText = false, data, withCredentials;
  if (typeof obj === 'object') {
    url = obj.url;
    type = obj.type || type;
    isText = obj.isText;
    data = obj.data;
    withCredentials = obj.withCredentials;
  }
  var isGet = type.toUpperCase() === 'GET';

  return new Promise((resolve, reject) => {

    var xhr = new XMLHttpRequest();
    if (isGet && data) url += (url.indexOf('?') != -1 ? '' : '?') + urlParams(data);
    xhr.open(type, url, true);
    if (withCredentials) xhr.withCredentials = true;
    if (!isGet && data) {
      // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
      // xhr.send(urlParams(data));
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
    xhr.onload = function () {
      if (xhr.status === 200) {
        var text = xhr.responseText;
        resolve(isText ? text : JSON.parse(text));
      } else {
        reject(new Error(this.statusText));
      }
    };
  });
  
}