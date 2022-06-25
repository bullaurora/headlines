import request from "@/utils/http";

export const recommendMusicMenu=(limit)=>{
    return request({
        method: 'GET',
        url: '/personalized',
        params:{
            limit,
        }
    }).then(res=>{
        return res.data.result
    })
}

export const newMusic=(limit)=>{
    return request({
        url: '/personalized/newsong',
        params:{
            limit,
        }
    }).then(res=>{
        return res.data.result
    })
}