class HTTP {
  get(url, data = '', fn) {
      return new Promise((reslove, reject) => {
          wx.request({
              url,
              data,
              success(res) {
                  if (res.data.errorCode == -1) {
                      reslove(res.data)
                  } else {
                      reject(res)
                  }
              },
              fail(e) {
                  reject(e)
              },
              compelet() {
                  fn && fn()
              }
          })
      })
  }
  post(url, data = '', fn) {
      return new Promise((reslove, reject) => {
          wx.request({
              url,
              data,
              method:'POST',
              success(res) {
                  if (res.data.errorCode == -1) {
                      reslove(res.body)
                  } else {
                      reject(res.data)
                  }
              },
              fail(e) {
                  reject(e)
              },
              compelet() {
                  fn && fn()
              }
          })
      })
  }
}
export {HTTP} 