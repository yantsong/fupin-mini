// pages/dingweicity/dingweicity.js
var city = require('../../allcity.js');
var util = require('../../utils/util.js'); 
var url = util.url;
var that = '' , schoolid = '' , cityid = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that  = this;

    // var allcity = city.slice(1);
    // console.log(allcity);
    // that.setData({
    //   allcity:allcity,
    // })
    wx.getStorage({
      key: 'cityname',
      success: function(res) {
        that.setData({
          cityname:res.data,
        })
      },
    })
    console.log('incity');
    wx.request({
      url: url + 'getCityList.action',
      method:'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        if(res.data.success){
          wx.setStorageSync('cityList',res.data.body.cityList)
          that.setData({
            allcity:res.data.body.cityList,
            cityList:res.data.body.cityList
          })
        }
      }
    })
   
    wx.getSystemInfo({
      success:function(res){
        console.log(res);
        that.setData({
          heights:res.windowHeight*2 - 180,
        })
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
  clickzimu:function(e){
    that.setData({
      zimu:e.currentTarget.dataset.zimu,
    })
  },
  search(e){
    let str = e.detail.value
    if (!str) {
      this.setData({
        allcity: that.data.cityList
      })
      return
    }
    function filterCity(){
     let result = that.data.cityList.filter(
        i => i.orgName.indexOf(str) != -1
      )
      return result
    }
      this.setData({
        allcity:filterCity()
      })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  clickcity:function(e){
    console.log(e);
    if(e.currentTarget.dataset.in){
      wx.setStorage({
        key: 'cityid',
        data: e.currentTarget.dataset.in,
      })
      wx.setStorage({
        key: 'cityname',
        data: e.currentTarget.dataset.name,
        success:function(){
          wx.navigateTo({
            url: '../dingweischool/dingweischool?cityid=' + e.currentTarget.dataset.in,
          })
        }
      })
    }
    
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
});