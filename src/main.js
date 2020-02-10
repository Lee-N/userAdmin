import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.config.devtools = true
Vue.config.productionTip = false
import login from './components/login'
import admin from './components/admin'
import userAdmin from './components/userAdmin'
import addUser from './components/addUser'
import updateUser from './components/updateUser'
const routes=[
    {path:'/login',component:login},
    {
        path:'/admin',
        component:admin,
       children:[
           {name:'admin',path:'userAdmin',component:userAdmin,meta:{keepAlive:true}},
           {path:'addUser',component:addUser},
           {path:'updateUser',component:updateUser},
           {path:'',component:userAdmin}
       ]
    },
    { path:'/admin',component:admin},
    {path:'*',component:login}
]
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})
router.beforeEach((to, from, next)=>{
    console.log(to);
    if(to.name=="admin"){
        if(to.params.alive==false)
        to.meta.keepAlive=false
        else
            to.meta.keepAlive=true
    }

    next();
})

new Vue({
    router,
  render: h => h(App),
}).$mount('#app')
