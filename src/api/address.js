/**
 * @author: zzj
 * @date: 2020-02-27 17:27:43
 * @version: 1.0
 */
import request from '../config/request';

const BASIC_PATH = process.env.VUE_APP_BASIC;

export function listAddress(data) {
  return request({
    url: BASIC_PATH + '/platformCustomerAddress/listByOpenIdAndShopNo',
    method: 'get',
    params: data
  })
}

export function saveAddress(data) {
  return request({
    url: BASIC_PATH + '/platformCustomerAddress/saveOrUpdate',
    method: 'post',
    data: data
  })
}
export function deleteAddress(data) {
  return request({
    url: BASIC_PATH + '/platformCustomerAddress/delete',
    method: 'post',
    data: data
  })
}
