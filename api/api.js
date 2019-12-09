import {HTTP} from '../utils/http'
import {fpUrl} from '../utils/config'
const http = new HTTP()
//首页公告
export const getNotice = http.get(
  fpUrl+'/getBounced.action'
)
//5、公告列表
export const getNoticeList = http.get(
  fpUrl+'/getBouncedAllList.action'
)
//6.6、公告详情
export const getNoticeDetail = http.get(
  fpUrl+'/getBoundDetail.action'
)
//6.9、获取商品详情
export const getFoodsDetail = goodsId => http.get(
  fpUrl+'/getDetailByGoodsId.action', {goodsId}
)
//11、获取商品分类
export const getFoodsList = () => http.get(
  fpUrl+'/getGoodsClassifyList.action'
)
//12、获取商品分类下的商品
export const getKindsFoods= classifyId => http.get(
  fpUrl+'/getGoodsByClassifyId.action', {classifyId}
)
// 获取
export const getAddressList= openId => http.get(
  fpUrl+'/toAddressList.action', {openId}
)

//认养今日推荐商品
// https://abc.suda60.com/getAdoptMainGoodsList.action
export const getrenyanList = () => http.get(
  fpUrl + '/getAdoptMainGoodsList.action'
)
