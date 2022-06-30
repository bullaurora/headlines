import request from '@/utils/http.js'

//登陆
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data,
  })
}
//发送验证码
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`,
  })
}

//获取个人信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: `/v1_0/user`,
   
  })
}

/**
 * 获取频道列表
 */
 export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: `/v1_0/user/channels`,
   
  })
}
/**
 * 关注用户
 */
 export const httpAddFollow = (target) => {
  return request({
    method: 'POST',
    url: `/v1_0/user/followings`,
    data:{
      target
    }
  })
}
/**
 * 关注用户
 */
 export const httpCancelFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`,
   
  })
}
/**
 * 获取当前用户登陆的个人资料
 */
 export const httpGetUserProfile = () => {
  return request({
    method: 'GET',
    url: `/v1_0/user/profile`,
   
  })
}

/**
 * 获取当前用户登陆的个人资料
 */
 export const httpUpdateUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: `/v1_0/user/profile`,
    data
   
  })
}

/**
 * 获取当前用户登陆的个人资料
 */
 export const httpUpdateAvatar = (data) => {
  return request({
    method: 'PATCH',
    url: `/v1_0/user/photo`,
    data
   
  })
}