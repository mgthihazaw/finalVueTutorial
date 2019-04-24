import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home/index.vue';
import SignIn from './components/Signin/index.vue'
Vue.use(VueRouter);

const routes=[
    { path: '/', component:Home },
    { path: '/signin', component:SignIn }
];

export default new  VueRouter({
    mode: 'history',
    routes,
    scrollBehaviour(from,to,savePosition){
        return { x: 0 , y: 0 }
    }
})