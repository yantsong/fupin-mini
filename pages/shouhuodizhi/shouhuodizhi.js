// pages/shouhuodizhi/shouhuodizhi.js 
var util = require('../../utils/util.js');
var that = '' , url = util.url , schoolid = '' , openId = '' ;
var addressId = '' , orgId = '' , name = '' , phone = '' , floorId = '' , remarks = '' , ifMr = '' ;
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
      },
    })
    wx.getStorage({
      key: 'floorid',
      success: function(res) {
        floorId = res.data;
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
   let openId =  wx.getStorageSync('openId');
    wx.request({
      url: url + 'toAddressList.action',
      method: 'post',
      data: {
        openId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r);
        let data = r.data;
        if (data.errorCode == -1) {
          that.setData({
            dizhilist: data.body.addressList,
          })

        }
        else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  adddizhi:function(){
    wx.navigateTo({
      url: '../adddizhi/adddizhi',
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  bianjidizhi:function(e){
    console.log(e);
    let dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../bianjidizhi/bianjidizhi?addressId='+dataset.id+'&openId='+openId+'&orgId='+schoolid+'&name='+dataset.name+'&telephone='+dataset.phone+'&floorId='+floorId+'&remarks='+dataset.remarks+'&ifMr='+dataset.ifmr+'&floorNum='+dataset.floor,
    })
    
  },
  godetail:function(e){
    console.log(e);
    let dataset = e.currentTarget.dataset;
    wx.setStorage({
      key: 'yonghu',
      data: dataset.name,
    })
    wx.setStorage({
      key: 'phones',
      data: dataset.phone,
    })
    wx.setStorage({
      key: 'floornum',
      data: dataset.floor,
    })
    wx.setStorage({
      key: 'addressId',
      data: dataset.id,
    })
    wx.setStorage({
      key: 'remarks',
      data: dataset.remarks,
    })
    wx.setStorage({
      key: 'orgName',
      data: dataset.orgname,
      success:function(){
        wx.navigateBack({
          delta: 1
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