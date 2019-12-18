// components/helppage/helppage.js
import { getHelpList,getHelpDetail } from '../../api/api';
import { picUrl } from '../../utils/config';
Page({
  _tohelpDetail(e){
    const {id} = e.currentTarget.dataset
    console.log(e);
    wx.navigateTo({
      url: `/pages/helpdetail/helpdetail?id=${id}`,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  _getHelpList(){
    getHelpList().then(
      res => {
        const helplist = res.body.helpList.map(
          i => {
            i.imgs = i.goodsPicurl.split(',').filter(item => item && item !== 'null')
            i.imgs = i.imgs.map(it => picUrl + it)
            return i 
          }
        )
        this.setData({
          helplist
        })
      }
    )
  },
  /**
   * 页面的初始数据
   */
  data: {
    helplist:[1,2,3,4],
    picUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getHelpList()
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