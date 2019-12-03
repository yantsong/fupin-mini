// miniprogram/pages/tuijian/tuijian.js 
var util = require('../../utils/util.js');
var that = '', url = util.url, imgUrl = util.imgUrl , floorid = '' , schoolid = '' , fenleiid = '' ;
function huoqulist(schoolid,floorid,fenleiid = '',shopName = ''){
  wx.request({
    url: url + 'getShopStoreList.action',
    data: {
      orgroleId: schoolid,
      floorId: floorid,
      classifyId:fenleiid,
      shopName
    },
    method: 'post',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (r) {
      console.log(r);
      let data = r.data;
      if (data.errorCode == -1) {
        let wmshop = data.body.WMshop.sort(
         (a,b)  => a.isOpen - b.isOpen < 0
        )
        that.setData({
          lsshop:data.body.LSshop,
          wmshop,
        })
      }
      else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
        })
      }
    }
  })
}
Page({                                                                                  

  /**
   * 页面的初始数据
   */
  data: {
    fenlei:7,
    dianpu:2, 
    imgUrl:imgUrl,
    fenlei_li1:'fenlei-li1',
    floorid,
    schoolid,
    count:100,
    width:100,
    marginleft:0,
    maskHeight:0,
    maskPosition:0,
    showMaskFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    that = this;
    // let floorid = wx.getStorageSync('floorid') || ''
    // that.setData({floorid})
    wx.getStorage({
      key: 'floorid',
      success: function(res) {
        floorid = res.data;
        that.setData({floorid})
      },
      fail(){
        console.log('fail');
      }
    })
    wx.getStorage({
      key: 'schoolid',
      success: function(res) {
        schoolid = res.data;
        that.setData({schoolid})
        console.log('requst');
        wx.request({
          url: url + 'getShopClassify.action',
          data:{
            orgId:schoolid,
            floorId:that.data.floorid,
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success:function(r){
            console.log(r);
            let data = r.data;
            let precent = 100
            let width = '100%'
            if(data.errorCode == -1){
              if(data.body.listMap.length > 7){
                precent = Math.ceil((data.body.listMap.length + 1)/2) * 25
                width = (100 / precent * 100).toFixed(2) + '%'
                that.setData({showMaskFlag:true})
              }
              that.setData({
                fenlei:data.body.listMap,
                count:precent+'%',
                width
              })
            }
          }
        })

        huoqulist(schoolid,floorid);
      },
      fail(){
        console.log('object');
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // const query = wx.createSelectorQuery()
    // query.select('.fenlei-ul').boundingClientRect()
    // query.select('.progress').boundingClientRect()
    // // console.log(kindDomInfo);
    // query.exec((res) => {
    //   res[0].top // #the-id节点的上边界坐标
    //   console.log(res[1])
    //   this.setData({
    //     maskPosition: res[0].top + 'px',
    //     maskHeight:res[0].height + res[1].height + 'px',
    //     showMaskFlag:true
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {

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
  searchShop(e){
    let shopname = e.detail.value
    let schoolid = this.data.schoolid
    let floorid = this.data.floorid
    huoqulist(schoolid,floorid,'',shopname)
  },
  huadong:function(e){
    console.log(e);
    let scrollLeft = Math.ceil(e.detail.scrollLeft);
    let scrollWidth = Math.ceil(e.detail.scrollWidth);
  let marginleft = scrollLeft/scrollWidth * 100 + '%';
    that.setData({
      marginleft,
    })
  },
  allfenlei:function(){
    that.setData({
      fenlei_li1:'fenlei-li1',
      fenleili:'',
    })
    huoqulist(schoolid,floorid,'');
  },
  clickfenlei:function(e){
    that.setData({
      fenlei_li1:'',
      fenleili:e.currentTarget.dataset.id,
    })
    // if(fenleili)
    huoqulist(schoolid, floorid, e.currentTarget.dataset.id);
  },
  godianpu:function(e){
    console.log(e);
    // if(e.currentTarget.dataset.open != 0){
      wx.navigateTo({
        url: '../dianpuneiye/dianpuneiye?shopid=' + e.currentTarget.dataset.shop, 
      })
    // }
  },
  godianpuli:function(e){
    // if(e.currentTarget.dataset.open != 0 ){
      wx.navigateTo({
        url: '../dianpuneiye/dianpuneiye?shopid=' + e.currentTarget.dataset.shopid,
      })
    // }
    
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