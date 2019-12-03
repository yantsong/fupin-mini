// pages/dingweilou/dingweilou.js
var util = require('../../utils/util.js');
var url = util.url;
var that = '' , floorid = '' , schoolid = '' ;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this ; 
    schoolid = options.schoolid;
    wx.request({
      url: url + 'getFloorList.action',
      data:{
        orgroleId:schoolid,
      },
      success:function(res){
        console.log(res);
        if(res.data.errorCode == -1){
          that.setData({
            floorList:res.data.body.floorList
          })
        }
        else{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
          })
        }
      }
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
  clickfloor:function(e){
    let ee = e.currentTarget.dataset;
    floorid = ee.floorid;
    wx.setStorage({
      key: 'floorid',
      data: floorid,
      success:function(){
        wx.switchTab({
          url: '../index/index',
        })
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