// pages/myrydetail/myrydetail.js
import {getMyAdoptDetail} from '../../api/api'
import {imgsMap} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:''
  },
  _getDetail(id){
    getMyAdoptDetail(id).then(
      res => {
        console.log(res,'rr');
        const detail = res.body.map[0]
        detail.imgs = imgsMap(detail.pic)
        this.setData({detail})
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options 
    this._getDetail(id)
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