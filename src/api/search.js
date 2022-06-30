import request from '@/utils/http.js'
/**
 * 获取搜索建议
 */
export const httpGetSearchSuggestions = (params) =>{
    return request({
        method: 'GET',
        url:'/v1_0/suggestion',
        params
    })
}

/**
 * 获取搜索建议
 */
 export const httpGetSearchResults = (params) =>{
    return request({
        method: 'GET',
        url:'/v1_0/search',
        params
    })
}