// pages/failzhifu/failzhifu.js
import { appid } from '../../utils/config';
var that = '' , util = require('../..//utils/util.js');
var url = util.url , imgUrl = util.imgUrl , allprice = '' , openId = '' , orderNumber = '' , types = '' , schoolid = '' ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allprice:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    allprice = options.allprice;
    orderNumber = options.orderNumber;
    that.setData({
      allprice:allprice
    })
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        openId = res.data;
      },
    })
    wx.getStorage({
      key: 'schoolid',
      success: function(res) {
        schoolid = res.data;
      },
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  zhifu:function(){
    wx.request({
      url: url + 'toRequestPayAgin.action',
      data: {
        openId: openId,
        orderId: orderNumber,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        console.log(e);
        if (e.data.errorCode == -1) {
          types = e.data.body.shopList.type;
          orderNumber = e.data.body.shopList.orderNumber;
          wx.request({
            url: url + 'toPayOrder.action?openId=' + openId +
              '&orderNumber=' + orderNumber + '&orgId=' + schoolid + '&money=' +
              allPrice + '&type=' + types +'&appid=' + appid,
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
        }
        else {
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
          })
        }
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})