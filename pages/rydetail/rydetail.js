// pages/detail/detail.js
var util = require('../../utils/util.js');
const IMGURL = util.imgUrl
var WxParse = require('../wxparse/wxparse');
var app = getApp()
import {
  getFoodsDetail,
  postMyAdopt,
  getAddressList
} from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    goodsPic: '',
    activeFoodsName: "",
    activeRealName: '',
    activeCatgroyName: '',
    activePrice: '',
    activeMaster: '',
    catgroyList: [],
    masterList: [],
    buyCount: 1,
    masterType: 2,
    maskShow: false,
    IMGURL,
    price: ''
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

  onReady: function () {

  },
  onShareAppMessage(){

  },
  onShow: function () {

  },
  _getAddressId() {
    return getAddressList().then(
      res => {
        try {
          const {
            addressList
          } = res.body;
          const {
            addressId
          } = addressList.find(i => i.ifMr);
          console.log(addressId, addressList);
          return addressId;
        } catch (error) {
          err => {
            console.log(err);
            wx.showModal({
              title: '',
              content: '请先填写默认收货地址',
              showCancel: true,
              confirmText: '去填写',
              confirmColor: '#3CC51F',
              success: (result) => {
                if (result.confirm) {
                  wx.navigateTo({
                    url: '/pages/shouhuodizhi/shouhuodizhi',
                    success: (result) => {

                    },
                    fail: () => {},
                    complete: () => {}
                  });
                }
              },
              fail: () => {},
              complete: () => {}
            });
          }
        }
      }
    )
  },
  _getDetail(id) {
    getFoodsDetail(id).then(
      res => {
        console.log(res);
        const goodsDetail = res.body.goodsDetail[0]
        const price = goodsDetail.price
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
          masterList,
          price
        })
        WxParse.wxParse('detail', 'html', goodsDetail.goodsDetail, this, 0)
      }
    )
  },
  _tapFoodsName(e) {
    const {
      cid,
      price
    } = e.target.dataset
    this._toActive('activeFoodsName', cid)
    this._toActive('activePrice', price)
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
    if (this.data.buyCount < 1) {
      wx.showModal({
        title: '提示',
        content: '数量必须大于1',
        showCancel: false,
        cancelColor: '#000000',
        confirmText: '好的',
      })
      return
    }
    if (this.data.catgroyList.length && !this.data.activeCatgroyName) {
      wx.showModal({
        title: '提示',
        content: '请选择产地',
        showCancel: false,
        cancelColor: '#000000',
        confirmText: '好的',
      })
      return
    }

    let {
      buyCount,
      price,
      activeCatgroyName
    } = this.data
    let {
      goodsId
    } = this.data.goodsDetail
    this._getAddressId().then(
      addressid => {
        return postMyAdopt(activeCatgroyName, addressid, price, buyCount, goodsId)
      }
    ).then(
      res => {
        console.log(res);
        if (res.errorCode == "-1") {
          wx.showToast({
            title: '认养成功',
          })
        }else {
          wx.showToast({
            title: '认养失败',
            content:res.msg
          })
        }
      }

    )
    // const placeId = 
    // wx.showModal({
    //   title: '您的申请已提交',
    //   content: '请等待工作人员联系您',
    //   showCancel: false,
    //   cancelColor: '#000000',
    //   confirmText: '我知道了',
    //   confirmColor: '#ffdd00',
    // });
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
    wx.navigateTo({
      url: '../confirmorder/confirm',
    })
  }
})