import MD5 from './md5'
const APPKEY = '6fc18957ce391f84a7ce34ce13cd99c4'

/**
 * 将参数+签名的值按照字典排序得到签名sign 参数的值按照升序排列
 * @param {Object} params   参数集合
 */
const getSign = params => {
  for (let key in params) {
    if (!params[key]) {
      delete params[key]
    }
  }
  params.appkey = APPKEY
  let keyArr = Object.keys(params).sort()
  let newObj = {}
  let Kstr = ''
  for (let i in keyArr) {
    newObj[keyArr[i]] = params[keyArr[i]]
    Kstr += params[keyArr[i]]
  }
  delete params['appkey']
  return MD5(Kstr)
}



module.exports = {
  getSign : getSign,
  getAppKey : getAppkey,

}