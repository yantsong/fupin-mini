// pages/dingweischool/dingweischool.js 
var that = '' , cityid = '' , schoolid = '', timer = null;
var util = require('../../utils/util.js'); 
var url = util.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:15,
    cityid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this ;
    this.computeCity()
    cityid = wx.getStorageSync('cityid')
    wx.request({
      url: url + 'getUniversityList.action',
      data:{
        orgroleId:cityid,
      },
      success:function(res){
        if(res.data.errorCode == -1){
          console.log(res.data,'universityList');
          that.setData({
            school: res.data.body.universityList
          })
        }
        else{
          wx.showToast({
            title: '网络异常',
            icon:"none",
          })
        }
      }
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          heights:res.windowHeight * 2 - 180,
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
  toSearch(e){
    clearInterval(timer)
    timer = setTimeout(
      () => this.search(e),600
    )
  },
  search(e){
    let str = e.detail.value
    wx.request({
      url: url + 'getUniversityList.action',
      data:{
        orgroleId: cityid,
        name: str
      },
      success:function(res){
        if(res.data.errorCode == -1){
          that.setData({
            school: res.data.body.universityList
          })
        }
        else{
          wx.showToast({
            title: '网络异常',
            icon:"none",
          })
        }
      }
    })
  },
  gocity:function(){
    wx.navigateTo({
      url: '../dingweicity/dingweicity',
    })
  },
  computeCity(){
    let that = this
    let cityid  = wx.getStorageSync('cityid')
    let cityList = wx.getStorageSync('cityList')
    if (!cityList || !cityList.length){
      wx.request({
        url: url + 'getCityList.action',
        success: function (res) {
          if (res.data.success) {
            let datas = res.data.body.cityList;
            filterCity(cityid,datas)
          }
        }
      })
    }else{
      filterCity(cityid,cityList)
    }
    function filterCity(value,arr){
      arr.forEach(
        i => {
          if (i.orgroleId == value) {
            that.setData({
              thiscity: i.orgName,
            })
          }
        }
      )
    }
  },
  clickschool:function(e){
    let ee = e.currentTarget.dataset;
    schoolid = ee.school;
    wx.setStorage({
      key: 'schoolid', 
      data: schoolid, 
      success:function(){
        wx.setStorage({
          key: 'model',
          data: ee.model,
        })
        if (ee.model == 2) {
          wx.setStorage({
            key: 'schoolname',
            data: ee.schoolname,
            success: function () {
              wx.navigateTo({
                url: '../dingweilou/dingweilou?schoolid=' + schoolid,
              })
            }
          })
        }
        else{
          wx.setStorage({
            key: 'schoolname',
            data: ee.schoolname,
            success:function(){
              wx.setStorage({
                key: 'floorid',
                data: '',
                success:function(){
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              })
              
            }
          })
          
        }
      }
    })
    // let noticeFrist = wx.getStorageSync('noticeFrist')
    // console.log(noticeFrist)
    // noticeFrist && wx.setStorageSync('noticeFrist', true)

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