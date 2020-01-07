// pages/catgroy/catgroy.js
import {
  getKindsFoods,
  getCatgroys
} from '../../api/api'
import {
  picUrl
} from '../../utils/config';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foods: [],
    tabs: [],
    picUrl,
    active_tabs_id: ''
  },
  _tabHandler(e) {
    const classifyId = e.target.dataset.id
    this.setData({
      active_tabs_id: classifyId
    })
    this._getClassify(classifyId)
  },
  _getClassify(classifyId) {
    wx.showLoading();
    getKindsFoods(classifyId).then(
      res => {
        console.log(res, 'ressss');
        const foods = res.body.classifyGoodsList
        this.setData({
          foods
        })
        wx.hideLoading()
      }
    )

  },
  _getCatgroys() {
    getCatgroys.then(
      res => {
        console.log(res, 'res');
        const tabs = res.body.classifyList
        this.setData({
          tabs
        })
      }
    )
  },
  _toDetail(e) {
    const {id} = e.currentTarget.dataset
    console.log(id,'id');
    if (id) {
      wx.navigateTo({
        url: `/pages/detail/detail?goodsId=${id}`,
        success: (result) => {

        },
        fail: () => {},
        complete: () => {}
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const classifyId = options.classifyid
    this._getClassify(classifyId)
    this._getCatgroys()
    this.setData({active_tabs_id:classifyId})
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