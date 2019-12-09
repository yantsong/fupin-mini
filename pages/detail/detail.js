// pages/detail/detail.js
var util = require('../../utils/util.js');
var WxParse = require('../wxparse/wxparse');
var app = getApp()
import {
  getFoodsDetail
} from '../../api/api'
const IMGURL = util.imgUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    activeFoodsName: "",
    activeRealName: '',
    activeCatgroyName: '',
    activeMaster: '',
    catgroyList: [],
    masterList: [],
    buyCount: 0,
    masterType: 2,
    maskShow: false,
    IMGURL
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(util, 'util');
    const {
      goodsId
    } = options
    this._getDetail(goodsId)
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

  },
  _getDetail(id) {
    getFoodsDetail(id).then(
      res => {
        console.log(res);
        const goodsDetail = res.body.goodsDetail[0]
        const activeRealName = goodsDetail.goodsName
        const catgroyList = goodsDetail.goodsComm.filter(
          i => i.commType == 2
        )
        const masterList = goodsDetail.goodsComm.filter(
          i => i.commType == 1
        )
        console.log(catgroyList, masterList);
        this.setData({
          activeRealName,
          goodsDetail,
          catgroyList,
          masterList
        })
        WxParse.wxParse('detail', 'html', goodsDetail.goodsDetail, this, 0)
      }
    )
  },
  _tapFoodsName(e) {
    const {
      cid
    } = e.target.dataset
    this._toActive('activeFoodsName', cid)
  },
  _tapCatgroyItem(e) {
    const {
      commid
    } = e.target.dataset
    this._toActive('activeCatgroyName', commid)
  },
  _tapMaster(e) {
    const {
      commid
    } = e.currentTarget.dataset
    this._toActive('activeMaster', commid)
  },
  _toActive(field, value) {
    console.log(this.data[field] === value, value);
    this.data[field] === value ? value = '' : ''
    this.setData({
      [field]: value
    })
  },
  _add() {
    let buyCount = this.data.buyCount + 1
    this.setData({
      buyCount
    })
  },
  _cut() {
    if (this.data.buyCount === 0) return
    let buyCount = this.data.buyCount - 1
    this.setData({
      buyCount
    })
  },
  _toBuy() {
    this.setData({
      maskShow: true
    })
  },
  _close() {
    this.setData({
      maskShow: false
    })
  },
  _confirm() {
    const {
      activeRealName,
      activeFoodsName,
      activeCatgroyName,
      activeMaster,
      buyCount
    } = this.data
    app.globalData.detailInfo = {
      activeRealName,
      activeFoodsName,
      activeCatgroyName,
      activeMaster,
      buyCount
    }
    wx.navigateTo({
      url: '../confirmorder/confirm',
    })
  }
})