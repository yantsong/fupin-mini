/**
 * 图片预加载组件
 */
Component({
    properties: {
      _height: { // 属性名
        type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
        value: '500rpx', // 属性初始值（可选），如果未指定则会根据类型选择一个
      },
      _position: { // 属性名
        type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
        value: '300rpx', // 属性初始值（可选），如果未指定则会根据类型选择一个
      },
    },
    data: {
      showFlag: false,
      heightValue:{}
    },
    methods: {
      taped: function (e) {
        console.log(this.data.showFlag,'fals')
        wx.setStorageSync('tips', true)
        this.setData({
          showFlag: false
        })
      },
      _initFlag(){
        let flag
        try {
          flag = wx.getStorageSync('tips')
        } catch (error) {
          flag = true
        }
        console.log(flag);
        if (!flag) {
          this.setData({showFlag:true})
        }
        console.log(this.data._height,'height',this.data._position,'position');
        // this.setData({
        //   positionValue:{
        //     top:this.data.position,
        //     height:this.data.height
        //   }
        // })
      }
    },
    lifetimes: {
      attached() {
        // 在组件实例进入页面节点树时执行
        this._initFlag()
      },
      detached() {
        // 在组件实例被从页面节点树移除时执行
      },
    },
    // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
    attached() {
      // 在组件实例进入页面节点树时执行
      this._initFlag()
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
    
  })
  