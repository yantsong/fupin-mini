// pages/orderlist/orderlist.js
var util = require('../../utils/util.js');
var that = '' , url = util.url , imgUrl = util.imgUrl , openId = '' , schoolid = '' , orderState = '' , page = 1 , imgurl = util.imgurl;
const map = {
            0 : '交易失败',
            1 : '立即支付',
            2 : '待接单',
            3 : '代配送',
            4 : '配送中',
            5 : '查看详情'
          }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:imgUrl,
    imgurl:imgurl,
    status:0,
    showList:[],
    map
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    orderState = options.orderState;

    wx.getStorage({
      key: 'openId',
      success: function(res) {
        openId = res.data;
        wx.request({
          url: url + 'getOrderListByOrderState.action',
          data:{
            openId:openId,
            orderState:orderState,   
            pageNum:page
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
            console.log(res);
            let data = res.data;
            if(data.errorCode == -1){
              that.setData({
                list:data.body.orderList,
              })
            }
          }
        })
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
  goorderxq:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../orderxq/orderxq?orderid='+e.currentTarget.dataset.orderid+'&orderState='+orderState,
    })
  },
  gozhifu:function(e){
    console.log(e);
    let data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../dianpuneiye/dianpuneiye?orderid='+data.orderid+'&types='+data.types+'&price='+data.price+'&ordernum='+data.ordernum+'&shopid='+data.shopid,
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