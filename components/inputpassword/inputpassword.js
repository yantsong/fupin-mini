Component({
  data: {
    //输入框聚焦状态
    isFocus: true,
    //输入框聚焦样式 是否自动获取焦点
    focusType: true,
    valueData: '', //输入的值
    dataLength: '',
    boxList: [1, 2, 3, 4]
  },
  // 组件属性
  properties: {
  },
  // 组件方法
  methods: {
    // 获得焦点时
    handleUseFocus() {
      this.setData({
        focusType: true
      })
    },

    // 失去焦点时
    handleUseBlur() {
      this.setData({
        focusType: false
      })
    },

    // 点击6个框聚焦
    handleFocus() {
      this.setData({
        isFocus: true
      })
    },

    // 获取输入框的值
    handleSetData(e) {
      console.log(e, 'ee');
      // 更新数据
      this.setData({
        dataLength: e.detail.value.length,
        valueData: e.detail.value
      })
      // 当输入框的值等于4时（发起支付等...）
      if (e.detail.value.length === 6) {
        // 通知用户输入数字达到6位数可以发送接口校验密码是否正确
        this.triggerEvent('initData', e.detail.value)
      }
    },
    //关闭
    handleClose() {
      this.triggerEvent('close')
    },
    //提交
    handleSubmit(e) {
      console.log(e);
      if (this.data.valueData.length < 4) {
        // 通知用户输入数字达到6位数可以发送接口校验密码是否正确
        wx.showToast({
          title: '请输入4位密码',
          icon: 'none',
          image: '',
          duration: 1000,
          mask: false,
          success: (result)=>{
          },
          fail: ()=>{},
          complete: ()=>{}
        });
        this.setData({
          isFocus:true
        })
        return
      }
      this.triggerEvent('submit', this.data.valueData)
    }

  }
})