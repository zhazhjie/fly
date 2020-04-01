/**
 * @author: zzj
 * @date: 2020-03-07 11:07:41
 * @version: 1.0
 */
import request from '../config/request';

const BASIC_PATH = process.env.VUE_APP_BASIC;

export function getByShopNo(data) {
  return request({
    url: BASIC_PATH + '/shopInfo/getByShopNo',
    method: 'get',
    params: data
  })
}

export function listBizType(data) {
  return request({
    url: BASIC_PATH + '/shopBusinessType/listTakeout',
    method: 'get',
    params: data
  })
}

export function getShopList(data) {
  return request({
    url: BASIC_PATH + '/shopInfo/listByOrgNo',
    method: 'get',
    params: data
  })
}
