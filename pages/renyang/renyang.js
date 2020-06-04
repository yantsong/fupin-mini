// pages/aijia/aijia.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgList:[],
    recommendedImg:[],
    homeImg:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    wx.request({
      url: `https://abc.suda60.com/getAdopt.action`,
      method: 'get',
      success(res){
        let Images=res.data.body.classifyList.map(item=>{
          return "https://"+item.icon
        })
        that.setData({
          ImgList:Images
        })
      }
  }),
  wx.request({
    url: `https://abc.suda60.com/getAdoptPushGoodS.action`,
    method: 'get',
    success(res){
      let Images=res.data.body.goodsPushList.map(item=>{
        return "https://"+item.pushPic
      })
      that.setData({
        recommendedImg:Images,
        recommend:res.data.body.goodsPushList
      })
    }
  }),
    wx.request({
      url: `https://abc.suda60.com/getAdoptMainGoodsList.action`,
      method: 'get',
      success(res){
        let Images=res.data.body.goodsList.map(item=>{
          return "https://"+item.goodsPic
        })
        that.setData({
          homeImg:Images,
          homeList:res.data.body.goodsList
        })
      }
})
},
_toDetail(e){
const goodsId = e.currentTarget.dataset.goodsid;
console.log(e,'e');
wx.navigateTo({
  url: `/pages/rydetail/rydetail?goodsId=${goodsId}`,
  success: (result)=>{
    
  },
  fail: ()=>{},
  complete: ()=>{}
});
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