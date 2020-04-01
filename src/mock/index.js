import Mock from 'mockjs'
import * as login from './modules/base'

createMock(login);

function createMock(mod) {
  for (let key in mod) {
    let model = mod[key]();
    Mock.mock(new RegExp('/app/' + model.url), model.type, () => {
      return model.data
    })
  }
}
