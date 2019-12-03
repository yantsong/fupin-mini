var url = 'http://abc.suda60.com/';
var imgUrl = 'http://';
var imgurl = 'http://abc.suda60.com/';
import { appid } from './config';
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const ifOpenId =  () => {
  let openId
  try {
     openId = wx.getStorageSync('openId')
  }
  catch (error) {
      wx.showToast({title:error})
  }
  return !!openId
}
const doLogin = successFn => {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      console.log('发送请求了');
      wx.request({
        url: 'https://abc.suda60.com/toGetOpenIdByCode.action',
        data: {
          code: res.code,
          nickName:'fakeName',
          avatarUrl:'https://developers.weixin.qq.com/miniprogram/assets/images/list@2x.png',
          appid
        },
        header: {
          'content-type': 'json'
        },
        success: function (e) {
          if (e.data.success) {
            console.log('成功');
            wx.setStorage({
              key: 'openId',
              data: e.data.body.openId,
              success:function(){
                console.log('将执行回调');
                successFn()
                console.log('openid写入成功');
              },
            })

          }
        },
        fail(err){
          console.log(err,'login失败');
        }
      })
    }
  })
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  url:url,
  imgUrl:imgUrl,
  imgurl:imgurl,
  doLogin,
  ifOpenId
}
