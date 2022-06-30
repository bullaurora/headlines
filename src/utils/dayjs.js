import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
// 定义一个全局过滤
// 参数1：过滤器名称
//参数2：过滤器函数
Vue.filter('relativeTime',(value)=>{
    return dayjs().to(dayjs(value))
})
