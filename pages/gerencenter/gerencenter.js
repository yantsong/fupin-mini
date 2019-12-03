// pages/gerencenter/gerencenter.js 
var util = require('../../utils/util.js');
var that = '' , url = util.url , imgUrl = url.imgUrl , schoolid = '' , phones = '' ;
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    imgUrl:imgUrl,
    zhezhao:'none-display',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this ;
    
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
    wx.getStorage({
      key: 'username',
      success: function(res) {
        that.setData({
          username:res.data,
        })
      },
    })
    wx.getStorage({
      key: 'avatarUrl',
      success: function(res) {
        that.setData({
          avatarUrl:res.data,
        })
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  gowanshan:function(){
    wx.navigateTo({
      url: '../wanshanxinxi/wanshanxinxi',
    })
  },
  goallorder:function(){
    wx.navigateTo({
      url: '../orderlist/orderlist?orderState=-1',
    })
  },
  godaifu:function(){
    wx.navigateTo({
      url: '../orderlist/orderlist?orderState=1',
    })
  },
  goweiwan:function(){
    wx.navigateTo({
      url: '../orderlist/orderlist?orderState=2',
    })
  },
  goyiwan:function(){
    wx.navigateTo({
      url: '../orderlist/orderlist?orderState=5',
    })
  },
  godizhi:function(){
    wx.navigateTo({
      url: '../shouhuodizhi/shouhuodizhi',
    })
  },
  gofankui:function(){
    wx.navigateTo({
      url: '../userfankui/userfankui',
    })
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
  getphone:function(e){
    console.log(e);
    let that = this
    wx.request({
      url: url + 'getComplaintsTel.action',
      data:{
        orgId:schoolid,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        let phoneNumber = res.data.body.complaints
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
      }
    })
  },
  zhuanqian:function(){
    wx.request({
      url: url + 'getMainPriTelByOrgId.action',
      data:{
        orgId:schoolid,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        if(res.data.errorCode == -1){
          phones = res.data.body.userTel;
          that.setData({
            phones:res.data.body.userTel,
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
    that.setData({
      zhezhao:'display',
    })
  },
  makephones:function(){
    wx.makePhoneCall({
      phoneNumber: phones,
    })
  },
  close_zhezhao:function(){
    that.setData({
      zhezhao:'none-display',
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