/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-12-28 14:09:41
 * @version: 1.0
 */
import request from '../config/request';

const BASIC_PATH = process.env.VUE_APP_BASIC;
const UAC_PATH = process.env.VUE_APP_UAC;

export function login(data) {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'MjAyMDAxMDUxNDY3'
    }
  };
  let keys = Object.keys(data);
  let form = keys.map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&");
  return request.post(UAC_PATH + '/auth/form', form, config)
}

export function getUserInfo(data) {
  return request({
    url: '/app/userInfo',
    method: 'get',
    data: data
  })
}

export function getConfig(data) {
  return request({
    url: BASIC_PATH + '/shopTakeoutConfig/getConfig',
    method: 'get',
    params: data
  })
}

export function getAuthState(data) {
  return request({
    url: UAC_PATH + '/platformCustomerThirdAuth/getByOpenId',
    method: 'get',
    params: data
  })
}

export function register(data) {
  return request({
    url: UAC_PATH + '/platformCustomer/register',
    method: 'post',
    data: data
  })
}

export function sendValidCode(data) {
  return request({
    url: BASIC_PATH + '/public/sendValidCode',
    method: 'post',
    data: data
  })
}
