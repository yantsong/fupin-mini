// pages/myrylist/myrylist.js
import {
  picUrl
} from '../../utils/config';
import {
  getMyAdoptList
} from '../../api/api';
Page({
  _toDetail(e) {
    const {id} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/myrydetail/myrydetail?id=' + id,
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    myryList: [1, 2, 34, 4],
    picUrl
  },
  _getMyAdoptList() {
    getMyAdoptList().then(
      res => {
        const myryList = res.body.map
        this.setData({
          myryList
        })
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMyAdoptList()
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