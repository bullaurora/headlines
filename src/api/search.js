import request from "@/utils/http";

export const hotSearch=()=>{
    return request({
        method: 'GET',
        url: '/search/hot',
    }).then(res=>{
        return res.data.result.hots
    })
}
// 搜索结果列表
export const searchResult = params => request({
    url: '/cloudsearch',
    params
}).then(res=>{
    return res.data.result
})