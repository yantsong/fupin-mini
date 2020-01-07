// pages/detail/detail.js
var util = require('../../utils/util.js');
const IMGURL = util.imgUrl
var WxParse = require('../wxparse/wxparse');
var app = getApp()
import {
  getFoodsDetail
} from '../../api/api'
const map = {
  activeCatgroyName: '产地',
  activeFoodsName: '规格',
  buyCount:'购买数量'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    goodsPic:'',
    activeFoodsName: "",
    activeRealName: '',
    activeCatgroyName: '',
    activePrice:'',
    activeMaster: '',
    catgroyList: [],
    masterList: [],
    buyCount: 1,
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
  validate(map = map){
    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        const element = map[key];
        console.log(element,'element');
        if(!this.data[key]) {
        return  wx.showToast({
            title: '请选择'+ element,
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
          });
        }
      }
    }
    return true
  },
  _getDetail(id) {
    getFoodsDetail(id).then(
      res => {
        console.log(res);
        const goodsDetail = res.body.goodsDetail[0]
        const activeRealName = goodsDetail.goodsName
        const goodsPic = goodsDetail.goodsOne
        const catgroyList = goodsDetail.goodsComm.filter(
          i => i.commType == 2
        )
        const masterList = goodsDetail.goodsComm.filter(
          i => i.commType == 1
        )
        this.setData({
          goodsPic,
          activeRealName,
          goodsDetail,
          catgroyList,
          masterList
        })
        goodsDetail.goodsDetail && WxParse.wxParse('detail', 'html', goodsDetail.goodsDetail, this, 0)
        //初始化
        if(goodsDetail.goodsC && goodsDetail.goodsC[0].cid){
          this._toActive('activeFoodsName', goodsDetail.goodsC[0].cid)
          this._toActive('activePrice',goodsDetail.goodsC[0].price)
        }
        if(catgroyList.length && catgroyList[0].commId){
          this._toActive('activeCatgroyName', catgroyList[0].commId)
        }
      }
    )
  },
  _tapFoodsName(e) {
    const {
      cid,price
    } = e.target.dataset
    this._toActive('activeFoodsName', cid)
    this._toActive('activePrice',price)
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
    if (!this.validate()) return 
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
      buyCount,
      goodsPic,
      activePrice,
      goodsDetail
    } = this.data
    app.globalData.detailInfo = {
      goodsPic,
      activeRealName,
      activeFoodsName,
      activeCatgroyName,
      activeMaster,
      buyCount,
      activePrice,
      goodsDetail
    }
    if(!this.validate({activeMaster:'书记'})) return 
    wx.navigateTo({
      url: '../confirmorder/confirm',
    })
  }
})