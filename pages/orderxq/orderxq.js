// pages/orderxq/orderxq.js 
import { appid } from '../../utils/config';
var util = require('../../utils/util.js');
var that = '' , url = util.url , imgUrl = util.imgurl , order_id = '' , types = '' , price = '' , openId = '' , orderNumber = '' , schoolid = '' , paydata = '' ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:imgUrl,
    orderState:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    order_id = options.orderid;
    let orderState = options.orderState
    this.setData({orderState})
    if(options.price){
      price = options.price;
    }
    if(options.types){
      types = options.types;
    }
    if(options.ordernum){
      orderNumber = options.ordernum;
    }
    if(order_id&&price&&types){
      wx.getStorage({
        key: 'schoolid',
        success: function (res) {
          schoolid = res.data;
        },
      })
      wx.getStorage({
        key: 'openId',
        success: function (res) {
          openId = res.data;
          wx.request({
            url: url + 'toPayOrder.action?money=' + price + '&openId=' + openId + '&orderNumber=' + orderNumber + '&type=' + types + '&orgId=' + schoolid+'&appid=' + appid,
            success: function (res) {
              console.log(res);
              paydata = res.data;

            }
          })
        },
      })
      wx.request({
        url: url + 'toOrderRecordDetail.action',
        data: {
          orderRecordPId: order_id,
        },
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          let data = res.data;
          if (data.errorCode == -1) {
            that.setData({
              people: data.body.list,
            })
          }
        }
      })
    }
    else{
      wx.request({
        url: url + 'toOrderRecordDetail.action',
        data: {
          orderRecordPId: order_id,
        },
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          let data = res.data;
          if (data.errorCode == -1) {
            that.setData({
              people: data.body.list,
            })
          }
        }
      })
      
      
    }
    
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
  _testIfAndriod(){
    let result
    wx.getSystemInfo({
      success(res){
        console.log(res);
        result = res.platform != "ios"
      }
    })
    return result
  },
  call(e){
    let phoneNumber = e.target.dataset.phone
    if(phoneNumber){
      if (that._testIfAndriod()){
        wx.showModal({
          title: '提示',
          content: '确定拨打电话吗',
          success(r){
            if (r.confirm) {
              console.log('用户点击确定')
              wx.makePhoneCall({
                phoneNumber,
              })
            } else if (r.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        wx.makePhoneCall({
          phoneNumber,
        })
      }
    }
  },
  zhifu:function(){
    let openId = wx.getStorageSync('openId')
    wx.request({
      url: url + 'toRequestPayAgin.action',
      data: {
       openId,
       orderId:order_id
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        let data = res.data;
        let {money,orderNumber,orgId} = data.body.shopList
        // let types = data.body.shopList
        if (data.errorCode == -1) {
          wx.request({
            url: url + 'toPayOrder.action?money=' + money + '&openId=' + openId + '&orderNumber=' + orderNumber + '&orgId=' + orgId +'&appid=' + appid+ '&type=' + '',
            success: function (res) {
              console.log(res,'paydata');
              paydata = res.data;
              wx.requestPayment({
                timeStamp: paydata[0].timeStamp,
                nonceStr: paydata[0].nonceStr,
                package: paydata[0].package,
                signType: 'MD5',
                paySign: paydata[0].sign,
                success: function (res) {
                  console.log(res);
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
      }
    })
    // console.log(paydata);
    // wx.requestPayment({
    //   timeStamp: paydata[0].timeStamp,
    //   nonceStr: paydata[0].nonceStr,
    //   package: paydata[0].package,
    //   signType: paydata[0].sign,
    //   paySign: 'MD5',
    //   success: function (res) {
    //     console.log(res);
    //     wx.showToast({
    //       title: '支付成功',
    //       icon: 'none',
    //     })
    //   },
    //   fail: function () {
    //     wx.showToast({
    //       title: '支付失败',
    //       icon: 'none',
    //     })
    //   }
    // })
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