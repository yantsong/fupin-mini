// pages/helpdetail/helpdetail.js
import { picUrl } from '../../utils/config';
import {imgsMap} from '../../utils/util.js';
import { getHelpDetail,donate,postHelp } from '../../api/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [1, 2, 3, 4],
    showHelpMaskFlag: false,
    showHelpBtnFlag: false,
    inputPhoneFlag: false,
    phone: '',
    isMine:false,
    info:{},
    ellipse_length: 20 * 4,
    padFlag:false,
    id:null
  },
  comeon(){
    postHelp(this.data.id).then(
      res => {
        if(res.errorCode == -1) {
          this._getDetail(this.data.id)
        }
      }
    )
  },
  // method
  _enterPhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  _toDonate(){
    let phone = this.data.phone
    let reg = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0-9]|18[0-9]|14[57])[0-9]{8}$/)
    if (!reg.test(phone)) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none'
      })}
      else {
        let openId = wx.getStorageSync('openId')
        let {id} = this.data
        donate(id,phone,openId).then(
          res => {
            if(res.errorCode === '-1'){
              this.setData({
                inputPhoneFlag:false,
                showHelpMaskFlag:false
              })
              wx.showToast({
                title: '手机号已提交',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false
              });
            }
          }
        )
      }
  },
  _padContent(){
    const padFlag = !this.data.padFlag
    this.setData({
      padFlag
    })
  },
  _helpMaskHandler() {
   let showHelpMaskFlag = !this.data.showHelpMaskFlag
   let showHelpBtnFlag = !this.data.showHelpBtnFlag
    this.setData({
      showHelpMaskFlag,
      showHelpBtnFlag
    })
  },
  _toInputPhone() {
    this.setData({
      showHelpMaskFlag:true,
      showHelpBtnFlag: false,
      inputPhoneFlag: true
    })
  },
  _getDetail(id){
    getHelpDetail(id).then(
      res => {
        const info = res.body.helpDetail
        info.imgs = imgsMap(info.goodsPicurl)
        this.setData({info})

      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options
    this.setData({id})
    this._getDetail(id)
    try {
      const {mine} = options

      mine && this.setData({isMine:mine})      
    } catch (error) {
      
    }

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