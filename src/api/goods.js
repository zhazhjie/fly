/**
 * @author: zzj
 * @date: 2020-02-27 17:27:43
 * @version: 1.0
 */
import request from '../config/request';

const SHOP_GOODS_PATH = process.env.VUE_APP_SHOP_GOODS;

export function listByCustomType(data) {
  return request({
    url: SHOP_GOODS_PATH + '/shopGoodsCateCustom/listByCustomType',
    method: 'get',
    params: data
  })
}

export function listPageByCustomType(data) {
  return request({
    url: SHOP_GOODS_PATH + '/goodsInfo/listPageByCustomType',
    method: 'get',
    params: data
  })
}

export function getLargessStrategyGoodsBySpecId(data) {
  return request({
    url: SHOP_GOODS_PATH + '/goodsInfo/getLargessStrategyGoodsBySpecId',
    method: 'get',
    params: data
  })
}
