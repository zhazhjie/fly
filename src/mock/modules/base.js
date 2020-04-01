export function login() {
  let data = {
    "code": 0,
    "msg": null,
    "data": {
      "token": "77ae89be36504adfb5c09ef71409ea0e",
    }
  };
  return {
    url: 'login',
    type: 'post',
    data: data
  }
}

export function logout() {
  let data = {
    "code": 0,
    "msg": null,
    "data": {}
  };
  return {
    url: 'logout',
    type: 'get',
    data: data
  }
}

export function getUserInfo() {
  let data = {code: 0, data: {id: 1, userName: '小张'}};
  return {
    url: 'userInfo',
    type: 'get',
    data: data
  }
}

export function sendSms() {
  let data = {code: 0, data: '6666'};
  return {
    url: 'sendSms',
    type: 'post',
    data: data
  }
}
