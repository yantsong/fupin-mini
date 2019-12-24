// pages/applyhelp/applyhelp.js
import {
  getPhone,
  toAppLyHelp
} from '../../api/api';
const map = {
  telephone:'电话',
  content:'申请内容',
  name:'姓名'
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    phone: '',
    content: '',
    name: '',
    telephone: '',
    map
  },

  /**
   * 组件的方法列表
   */
  methods: {
    submit() {
    if(!this.validate()) return
      const {
        telephone,
        name,
        content
      } = this.data
      toAppLyHelp(content, name, telephone).then(
        res => {
          if (res.errorCode == -1) {
            wx.showToast({
              title: '申请成功',
              icon: 'none',
              image: '',
              duration: 500,
              mask: false,
              complete: () => {
                setTimeout(
                  () => {
                    wx.navigateBack({
                      delta: 1
                    });
                  }
                ,500)
              }
            });

          }
        }
      )
    },
    validate(){
      for (const iterator in map) {
        console.log(iterator,'a');
        if(!this.data[iterator]){
          wx.showToast({
            title:'请填写' + map[iterator],
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
          });
          return false
        }
      }
      return true
    },
    _getPhone() {
      getPhone().then(
        res => {
          const phone = res.body.complaints
          this.setData({
            phone
          })
        }
      )
    },
    _call() {
      const {
        phone
      } = this.data
      wx.makePhoneCall({
        phoneNumber: phone,
      })
    },
    content(e) {
      const content = e.detail.value
      this.setData({
        content
      })
    },
    name(e) {
      const name = e.detail.value
      this.setData({
        name
      })
    },
    telephone(e) {
      const telephone = e.detail.value
      this.setData({
        telephone
      })
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this._getPhone()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})