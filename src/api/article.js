import request from '@/utils/http.js'
/**
 * 文章请求模块
 */

/**
 * 请求获取文章列表数据
 */
export const getArticles = (params)=>{
    return request({
        method: 'GET',
        url:'/v1_0/articles',
        params
    })
}

/**
 * 获取文章
 */
 export const httpGetArticleById = articleId => {
    return request({
      method: 'GET',
      url: `/v1_0/articles/${articleId}`
    })
  }

  /**
 * 收藏文章
 */
 export const httpAddCollect = target => {
  return request({
    method: 'POST',
    url: `/v1_0/article/collections`,
    data: {
      target
    }
  })
}

 /**
 * 取消收藏文章
 */
  export const httpCancelCollect = target => {
    return request({
      method: 'DELETE',
      url: `/v1_0/article/collections/${target}`
    })
  }

   /**
 * 收藏文章
 */
 export const httpAddLike = target => {
  return request({
    method: 'POST',
    url: `/v1_0/article/likings`,
    data: {
      target
    }
  })
}

 /**
 * 取消收藏文章
 */
  export const httpCancelLike = target => {
    return request({
      method: 'DELETE',
      url: `/v1_0/article/likings/${target}`
    })
  }