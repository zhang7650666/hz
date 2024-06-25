// request.js
function request(url, method, data, header = {}) {
    my.showLoading({content: '加载中...'})
    return new Promise(function (resolve, reject) {
      my.request({
        url: url,
        method: method,
        data: data,
        headers: header,
        success: function (res) {
          // 请求成功，这里可以根据实际情况处理响应数据，比如对返回状态码进行判断
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res);
          }
        },
        fail: function (err) {
          // 请求失败
          reject(err);
        },
        complete: function() {
            my.hideLoading();
        }
      });
    });
  }
  
  export default {
    get(url, data, header) {
      return request(url, 'GET', data, header);
    },
    post(url, data, header) {
      return request(url, 'POST', data, header);
    },
    // ... 可以根据需要继续封装其他 HTTP 方法
  };