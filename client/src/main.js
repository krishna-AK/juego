import Vue from 'vue'
import App from './App.vue'
import store from './store'
// import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';


// // Import the styles directly. (Or you could add them via script tags.)
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

import Game from './components/Game.vue';
import LoginPanel from './components/LoginPanel.vue';
import UserOrders from './components/UserOrders.vue';
// import vuetify from './plugins/vuetify';


// Vue.use(BootstrapVue);
Vue.use(VueRouter)

const routes = [
  {path:'/game',component:Game},
  {path:'/login',component:LoginPanel},
  {path:'/myorders',component:UserOrders}
]

const router = new VueRouter({
  // mode: 'history',
  routes,
})
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

export default router;