// pages/userfankui/userfankui.js
var that = '' , openId = '' , schoolid = '' , content = '' , telephone = '' , name = '' ;
var util = require('../../utils/util.js');
var url = util.url , imgUrl = url.imgUrl ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:imgUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
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
  submit:function(){
    if(content&&telephone&&name){
      wx.request({
        url: url + 'addFeedBack.action',
        data: {
          openId: openId,
          orgId: schoolid,
          content:content,
          telephone:telephone,
          name:name,
        },
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          console.log(res);
          if(res.data.errorCode == -1){
            wx.showToast({
              title: res.data.msg,
              icon:'none',
              success:function(){
                setTimeout(function(){
                  wx.navigateBack({
                    delta:1,
                  })
                },300)
              }
            })
          }
        }
      })
    }
    else{
      wx.showToast({
        title: '请填写完整信息',
        icon:'none',
      })
    }
  },
  content:function(e){
    content = e.detail.value;
  },
  name:function(e){
    name = e.detail.value;
  },
  telephone:function(e){
    telephone = e.detail.value;
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