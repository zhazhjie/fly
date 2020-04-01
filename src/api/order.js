/**
 * @author: zzj
 * @date: 2020-03-06 15:01:13
 * @version: 1.0
 */
import request from '../config/request';

const VUE_APP_TRADE_ORDER = process.env.VUE_APP_TRADE_ORDER;

export function createTakeoutOrder(data) {
  return request({
    url: VUE_APP_TRADE_ORDER + '/shopGoodsOrder/createTakeoutOrder',
    method: 'post',
    data: data
  })
}

export function prePaySettleOrder(data) {
  return request({
    url: VUE_APP_TRADE_ORDER + '/shopGoodsOrder/prePaySettleOrder',
    method: 'post',
    data: data
  })
}

export function listPageTakeoutOrderByOpenId(data) {
  return request({
    url: VUE_APP_TRADE_ORDER + '/shopGoodsOrder/listPageTakeoutOrderByOpenId',
    method: 'get',
    params: data
  })
}

export function getTakeoutOrderDetail(data) {
  return request({
    url: VUE_APP_TRADE_ORDER + '/shopGoodsOrder/getTakeoutOrderDetail',
    method: 'get',
    params: data
  })
}

export function getOrderBySettleNo(data) {
  return request({
    url: VUE_APP_TRADE_ORDER + '/shopGoodsOrder/getOrderBySettleNo',
    method: 'get',
    params: data
  })
}

export function customerRefundOrder(data) {
  return request({
    url: VUE_APP_TRADE_ORDER + '/shopGoodsOrder/customerRefundOrder',
    method: 'post',
    data: data
  })
}

export function queryDeliverFee(data) {
  return request({
    url: VUE_APP_TRADE_ORDER + '/shopGoodsOrderDeliveryInfo/queryDeliverFee',
    method: 'get',
    params: data
  })
}
