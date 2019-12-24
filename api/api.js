import {HTTP} from '../utils/http'
import {fpUrl} from '../utils/config'
const http = new HTTP(fpUrl)
const openId = wx.getStorageSync('openId')
//首页公告
export const getNotice = http.get(
  '/getBounced.action'
)
// 26 帮助列表
export const getHelpList = () => http.get(
  '/toHelpList.action'
)
// 27 帮助详情
export const getHelpDetail = id => http.get(
  '/toHelpDetail.action',{id}
)
//28 帮助点赞
export const helpLike = id => http.get(
  '/toSendHelp.action',{id}
)
//29 实物帮助
export const donate = (id,tel,openId) => http.get(
  '/toDonationAdd.action',{id,tel,openId}
)
//29 实物帮助
export const postHelp = (id) => http.get(
  '/toSendHelp.action',{id}
)
//30实物帮助
export const payDonate = (Id,Money,openId) => http.get(
  '/toSendHelpSalay.action',{Id,Money,openId}
)
//31我的捐赠
export const myDonateList = () => http.get(
  '/toMyHelp.action',{openId}
)
//32榜单列表
/**
 * @description: 榜单列表
 * @param {type}  type = 1 综合榜单 type = 2 爱心榜单
 * @return: 
 */
export const getRankList = (openId,type) => http.get(
  '/toRankingList.action',{openId,type}
)
/**
 * @description: 榜单点赞
 * @param {id}  id = 榜单id
 * @return: 
 */
export const postlikeAction = (id) => http.get(
  '/toRankAdd.action',{openId,id}
)
/**
 * @description: 提交认养订单
 * @param 
 * @return: 
 */
export const postMyAdopt = (placeId,addressId,orderPrice,num,goodsId) => http.get(
  '/toAddAdoptOrderRecord.action',{openId,placeId,addressId,orderPrice,num,goodsId}
)
/**
 * @description: 获取我的认养
 * @param 
 * @return: 
 */
export const getMyAdoptList = () => http.get(
  '/toMyAdoptList.action',{openId}
)
/**
 * @description: 认养详情
 * @param orderRecordPId 认养id
 * @return: 
 */
export const getMyAdoptDetail = (orderRecordPId) => http.get(
  '/toMyAdoptDetail.action',{orderRecordPId}
)
/**
 * @description: 电话
 * @param 
 * @return: 
 */
export const getPhone = () => http.get(
  '/getComplaintsTel.action'
)
/**
 * @description: 申请帮扶
 * @param 
 * @return: 
 */
export const toAppLyHelp = (content,name,tel) => http.get(
  '/toAppLyHelp.action',{openId,content,name,tel}
)



//5、公告列表
export const getNoticeList = () => http.get(
  '/getBouncedAllList.action'
)
//6.6、公告详情
export const getNoticeDetail =(noticeId) => http.get(
  '/getBoundDetail.action',{noticeId}
)
//商品列表页顶部tab
export const getCatgroys = http.get(
  '/getGoodsClassifyList.action'
)
//6.9、获取商品详情
export const getFoodsDetail = goodsId => http.get(
  '/getDetailByGoodsId.action', {goodsId}
)
//11、获取商品分类
export const getFoodsList = () => http.get(
  '/getClassifyList.action'
)
//12、获取商品分类下的商品
export const getKindsFoods= classifyId => http.get(
  '/getGoodsByClassifyId.action', {classifyId}
)
console.log(openId,'openId');
// 获取
export const getAddressList= () => http.get(
  '/toAddressList.action', {openId}
)

//认养今日推荐商品
// https://abc.suda60.com/getAdoptMainGoodsList.action
export const getrenyanList = () => http.get(
  '/getAdoptMainGoodsList.action'
)
