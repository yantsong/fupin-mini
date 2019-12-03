//logs.js
const util = require('../../utils/util.js')
const getOrderMoneyApi = 'https://abc.suda60.com/toPayByFriOpenId.action'

Page({
  data: {
    money:0
  },
  onLoad: function (options) {
    console.log(options)
    let openId = wx.getStorageSync('openId')
    this.data.orderNumber = options.orderNumber
    this.data.orderId = options.orderId
    this.data.orgId = options.orgId
    this.getMoney(openId, options.orderId).then(
      res => {
        this.setData({
          money:(res/100).toFixed(2)
        })
      }
    )
  },
  onShareAppMessage(res){
    console.log(res)
    return {
      title:'球球你救救孩纸吧',
      path:`pages/frdPay/frdPay?orderNumber=${this.data.orderNumber}&orderId=${this.data.orderId}&orgId=${this.data.orgId}`
    }
  },
  test(){
    wx.navigateTo(
      {
        url:`../frdPay/frdPay?orderNumber=${this.data.orderNumber}&orderId=${this.data.orderId}&orgId=${this.data.orgId}`
      }
    )
  },
  getMoney(openId,orderId){
    console.log(openId, orderId);
    return new Promise(
      (reslove,reject) => {
        wx.request({
          url: getOrderMoneyApi,
          data: {
            openId,
            orderId
          },
          success(response){
            console.log(response)
            reslove(response.data.body.shopList.money)
          },
          fail(err){
            reject(err)
          }
        })
      }
    )
  },
})
