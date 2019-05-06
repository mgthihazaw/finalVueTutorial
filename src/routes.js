import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './Store/store'

import Home from './components/Home/index.vue';
import SignIn from './components/Signin/index.vue'
import Dashboard from './components/Dashboard/index'
import MainDashboard from './components/Dashboard/main.vue';
import AddPosts from './components/Dashboard/addPosts.vue';
import PostLists from './components/Dashboard/listPosts.vue';
import Post from './components/Post/post.vue'
import NotFound from './components/404/index'

Vue.use(VueRouter);
const authGuard = {
    beforeEnter: (to, from, next) => {
        const redirect = () => {
            if (store.state.admin.token) {
                if (to.path === '/signin') {
                    next('/dashboard')
                } else {
                    next()
                }

            } else {
                if (to.path === '/signin') {
                    next()
                } else {
                    next('/')
                }

            }
        }



        if (store.state.admin.refreshLoading) {
            store.watch((state, getters) => getters['admin/refreshLoading'], () => {
                redirect();
            })
        }
        else {

            redirect()
        }
    }
}
const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: SignIn, ...authGuard },
    {
        path: '/dashboard', component: Dashboard, children: [
            {path : '/',component: MainDashboard},
            {path: 'add_posts',component: AddPosts},
            {path: 'posts_list', component: PostLists}
        ], ...authGuard
    },
    { path:'/posts/:id' ,component : Post},
    {
        path : '*',
        component: NotFound
    }
];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehaviour(from, to, savePosition) {
        return { x: 0, y: 0 }
    }
})