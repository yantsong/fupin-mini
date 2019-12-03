// pages/baoming/baoming.js
var util = require('../../utils/util.js');
var WxParse = require('../wxparse/wxparse');
var url = util.url, imgUrl = util.imgUrl, that = '' , id = '' , openId = '' , name = '' , tel = '' ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this ;
    id = options.id;
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        openId = res.data;
        wx.request({
          url: url + 'toSignUpPage.action',
          data: {
            id: id,
            openId: openId,
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
            try {
              console.log(res,res.data,'=res.data')
              let data = res.data;
              WxParse.wxParse('article', 'html', data.body.content, that, 10);
              if(data.errorCode == -1){
                that.setData({
                  body:data.body
                })
              }
            } catch (error) {
              console.log(error,'errorInfo')
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
  name:function(e){
    name = e.detail.value;
  },
  telphone:function(e){
    tel = e.detail.value;
  },
  submit:function(){
    if(name&&tel){
      wx.request({
        url: url + 'toUserSignUp.action',
        data:{
          id:id,
          openId:openId,
          name:name,
          telphone:tel,
        },
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          console.log(res);
          if(res.data.errorCode == -1){
            wx.showToast({
              title: '报名成功',
              icon:'none',
            })
            setTimeout(function(){
              wx.navigateBack({
                delta:1,
              })
            },500)
          }
          else{
            wx.showToast({
              title: res.data.msg,
              icon:'none',
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