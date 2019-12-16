// pages/toplist/toplist.js
const tabs = ['榜单','爱心榜']
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs,
    tabsActive:0,
    toplist:[1,2,3,4,5,6],
    lovelist:[1,2,3,3,3,3],
    showPswdInputFlag:false,
    isMine:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  _FromCenterHandler(){
    app.listmine = false
    this.setData({
      tabsActive:1
    })
  },
  _toDetail(){
    wx.navigateTo({
      url: '/pages/toplist-detail/toplist-detail',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  _tabsHandler(e){
    const tabsActive = e.currentTarget.dataset.index
    this.setData({
      tabsActive
      // showPswdInputFlag:true
    })
  },
  _handlerInputClose(){
    this.setData({
      showPswdInputFlag:false
    })
  },
  _handlerInputSubmit(e){
    console.log(e.detail);
    //这里可以判断正确与否 
    // if 正确
    this._handlerInputClose()
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
    try {
      const {listmine} = app
      console.log(app,'app');
      if(listmine){
       this._FromCenterHandler()
      }
      
    } catch (error) {
      
    }
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