import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store'
import ElementUI from 'element-ui'
import VeeValidate, { Validator } from 'vee-validate'
import lang from 'element-ui/lib/locale/lang/ru-RU'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'
import fontAwesome from './fontAwesome'
import VueImg from 'v-img'
import ru from 'vee-validate/dist/locale/ru'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/main.scss'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(fontAwesome)
locale.use(lang)
Vue.use(VueImg)
Validator.localize('ru', ru)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!store.getters.isLogged) {
      next('/login')
    } else {
      await store.dispatch('initUser')

      if (to.matched.some(record => record.meta.is_admin)) {
        if (store.getters.isSuperuser) {
          next()
        }
        else {
          next('/dashboard')
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.isLogged) {
      next()
    }
    else {
      next('/dashboard')
    }
  } else {
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
