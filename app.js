//app.js
import { appid ,fpUrl} from './utils/config';
var openflag = false ; 
App({
  onLaunch: function (opt) {
    console.log(opt,'opt');
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('floorid', '')
    

    // 登录
    let openId = wx.getStorageSync('openId')

      if(openId){
        
        
      }
      else{
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.getUserInfo({
              withCredentials: false,
              success: function (r) {
                console.log(r);
                wx.setStorage({
                  key: 'username',
                  data: r.userInfo.nickName,
                })
                wx.setStorage({
                  key: 'avatarUrl',
                  data: r.userInfo.avatarUrl,
                })
                wx.request({
                  url: `${fpUrl}/toGetOpenIdByCode.action`,
                  data: {
                    code: res.code,
                    nickName: r.userInfo.nickName,
                    avatarUrl: r.userInfo.avatarUrl,
                    appid
                  },
                  header: {
                    'content-type': 'json'
                  },
                  success: function (e) {
                    console.log(e);
                    
                    if (e.data.success) {
                      wx.setStorage({
                        key: 'openId',
                        data: e.data.body.openId,
                        success:function(){
                          console.log('will switch');
                          if (opt.orderNumber) return 
                          wx.switchTab({
                      url: '../index/index',
                    })
                        },
                      })

                    }
                  }
                })
              },
              fail(){
                console.log('Fail');
                wx.request({
                  url: `${fpUrl}/toGetOpenIdByCode.action`,
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
                      wx.setStorage({
                        key: 'openId',
                        data: e.data.body.openId,
                        success:function(){
                          console.log('2',p);
                          if (opt.orderNumber) return 
                          console.log('will2');
                          wx.switchTab({
                      url: '../index/index',
                    })
                        },
                        fail(e){
                          console.log(e,'写入失败');
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        })
      }
      
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // wx.getShareInfo(res =>{
    //   console.log(res)
    // })
  },
  globalData: {
    userInfo: null
  },
  ifFrdPay(opt){
    return opt.orderNumber
  }
  
})
