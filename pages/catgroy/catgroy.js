// pages/catgroy/catgroy.js
import {getKindsFoods}  from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  _getClassify(classifyId){
    getKindsFoods(classifyId).then(
      res => {
        console.log(res,'res');
      }
    )
  },
  _toDetail(){
    let testid = 'ff8080816edbaac4016eeae94fa50005'
    if(testid) {
      wx.navigateTo({
        url: `/pages/detail/detail?goodsId=${testid}`,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const classifyId = options.classifyid
    this._getClassify(classifyId)
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