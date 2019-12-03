// pages/wanshanxinxi/wanshanxinxi.js 
var that = '' ;
var util = require('../../utils/util.js');
var url = util.url , imgUrl = util.imgUrl , openId = '' , name = '' , phone = '' , school = '' , time = '' , zhuanye = '' , joinDate = '';
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
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        openId = res.data;
        wx.request({
          url: url + 'getWxInfo.action',
          data:{
            openId:openId,
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
                user:data.body,
              })
              name = data.body.name
              phone = data.body.telphone
              joinDate = data.body.joinDate
              zhuanye = data.body.major
            }
            else{
              wx.showToast({
                title: data.msg,
                icon:'none',
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
  name:function(e){
    console.log(e);
    name = e.detail.value;
  },
  phone:function(e){
    phone = e.detail.value;
  },
  time:function(e){
    let user = this.data.user
    user.jonDate = e.detail.value;
    this.setData({user})
  },
  zhuanye:function(e){
    zhuanye = e.detail.value;
  },
  submit:function(){
    let reg = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0-9]|18[0-9]|14[57])[0-9]{8}$/) 
    if(!name.trim()){
      wx.showToast({
        title:'请输入姓名',
        icon:'none'
      })
      return
    }
    if(!reg.test(phone)){
      wx.showToast({
        title:'请输入正确手机号',
        icon:'none'
      })
      return
    }
    wx.request({
      url: url + 'toUpdatewxInfo.action',
      data:{
        openId:openId,
        name:name,
        telPhone:phone,
        joinDate:this.data.user.jonDate,
        major:zhuanye,
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
          })
        }
        setTimeout(function(){
          wx.navigateBack({
            delta:1,
          })
        },500)
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