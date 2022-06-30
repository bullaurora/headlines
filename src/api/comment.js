import request from '@/utils/http.js'
/**
 * 评论请求模块
 */

/**
 * 请求获取文章列表数据
 */
export const httpGetComments = (params)=>{
    return request({
        method: 'GET',
        url:'/v1_0/comments',
        params
    })
}

/**
 * 对评论或评论回复点赞
 */
 export const httpAddCommentLike = (target)=>{
    return request({
        method: 'POST',
        url:'/v1_0/comment/likings',
        data:{
            target
        }
    })
}
/**
 * 取消对评论或评论回复点赞
 */
 export const httpDeleteCommentLike = (target)=>{
    return request({
        method: 'DELETE',
        url:`/v1_0/comment/likings/:${target}`,

    })
}

/**
 * 取消对评论或评论回复点赞
 */
 export const httpAddComment = (data)=>{
    return request({
        method: 'POST',
        url:`/v1_0/comments`,
        data

    })
}