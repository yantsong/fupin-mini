//logs.js
import { appid } from '../../utils/config';
const util = require('../../utils/util.js')
const getOrderInfoApi = 'https://abc.suda60.com/toOrderPayDetail.action'
const getOrderMoneyApi = 'https://abc.suda60.com/toPayByFriOpenId.action'
const url = util.imgurl
const countdown = 30 * 60 * 1000
let timer = null
Page({
  data: {
    logs: []
  },
  data:{
    orderList:[],
    tiemEnd:false,
    money:0,
    url,
    time:0,
    min:'00',
    second:'00'
  },
  onLoad: function (opt) {
    this.data.openId = wx.getStorageSync('openId')
    this.data.orgId = opt.orgId
    this.data.orderId = opt.orderId
    this.data.orderNumber = opt.orderNumber
   if (util.ifOpenId()){
     this.getOrderInfomation(opt.orderNumber)
     this.getMoney(this.data.openId,opt.orderId).then(
       res => {
         this.setData({
           money: res
         })
       }
     )
   } else {
     console.log('nologin')
    util.doLogin(this.reFresh.bind(this,opt.orderNumber))
   }
  },
  onUnload: function () {
    timer = null
  },
  getOrderInfomation(orderNumber){
    let _this = this
    // fake orderNumber
    let _fakeId = 'oGm7t0NTEbpotScBiJWXtSnRxuDk'
    wx.request({
      url : getOrderInfoApi,
      data: {
        orderRecordPId : orderNumber
      },
      success(res){
        console.log(res,'resget')
        if (res.data.errorCode !== -1){
          let orderList = res.data.body.list
          let time = +new Date()
          console.log(time,orderList[0].date, time - orderList[0].date);
          _this.setData({
            orderList,
            time:orderList[0].date
          })
        timer =  setInterval(
            _this.countFn,1000
          )
        }
      }
    })
  },
  pay(){
    if(!this.data.money) {
      this.getMoney() 
      wx.showToast({
        title: '获取订单失败,请检查您的网络'
      })
      return
    }
    const fn  = this.afterPay
    wx.request({
      url: util.url + 'toPayOrder?openId=' + this.data.openId +
        '&orderNumber=' + this.data.orderNumber + '&orgId=' + this.data.orgId + '&money=' +
        this.data.money + '&type=2'+'&appid=' + appid,
      success: function (re) {
        wx.requestPayment({
          timeStamp: re.data[0].timeStamp,
          nonceStr: re.data[0].nonceStr,
          package: re.data[0].package,
          signType: 'MD5',
          paySign: re.data[0].sign,
          success: function (rs) {
            wx.showToast({
              title: '支付成功',
              icon: 'none',
            })
            // wx.switchTab({
            //   url: '../index/index',
            // })
            fn()
          },
          fail: function () {
            wx.showToast({
              title: '支付失败',
              icon: 'none',
            })
          }
        })
      }
    })
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
  reFresh(orderNumber){
    let openid = wx.getStorageSync('openId')
    console.log(openid);
    setTimeout(
      () => {
        wx.redirectTo(
          {
            url:`../frdPay/frdPay?orderNumber=${orderNumber}`
          }
        )
      ,3000}
    )
  },
  afterPay(){
    console.log('payOk');
  },
  countFn(){
    let newTime = + new Date()
    //剩余时间
    let lastTime = countdown - (newTime - this.data.time)
    let min = Math.floor(lastTime / (60 * 1000))
    let second =Math.floor(lastTime % (60 * 1000) / 1000 )
    console.log(countdown,lastTime,min,second);
    min < 10 ? min = '0' + min : min
    second < 10 ? second = '0' + second : second
    if(lastTime < 0) {
      timer = null
      this.setData({
        timeEnd:true
      })
    }
    this.setData({
      min,
      second
    })
  }
})
