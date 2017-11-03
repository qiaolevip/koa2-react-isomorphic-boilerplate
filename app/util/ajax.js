String.prototype.format = function() {
  if (arguments.length == 0) return this;
  for (var s = this, i = 0; i < arguments.length; i++)
    s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
  return s;
};

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
  var xhr = new XMLHttpRequest();
  if (isGet && data) url += (url.indexOf('?') != -1 ? '' : '?') + urlParams(data);
  xhr.open(type, url, true);
  if (withCredentials) xhr.withCredentials = true;
  if (!isGet && data) {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(urlParams(data));
  } else {
    xhr.send();
  }
  xhr.onload = function () {
    if (xhr.status === 200) {
      var text = xhr.responseText;
      obj.success(isText ? text : JSON.parse(text));
    } else {
      if (obj.failure) obj.failure(xhr.status);
    }
  };
}