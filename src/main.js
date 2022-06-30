import Vue from 'vue'
import App from '@/App.vue'
import '@/styles/index.less'
import store from '@/store'
import 'amfe-flexible'
import router from '@/router'
import vant from "@/vant";
import 'vant/lib/index.less';
import './utils/dayjs'
Vue.use(vant)
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App),

}).$mount('#app')
