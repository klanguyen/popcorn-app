import Vue from 'vue';
//import firebase from 'firebase';
import VueRouter from 'vue-router';
import HomePage from "@/components/HomePage";
import Movie from "@/components/Movie";
import SearchMovie from "@/components/SearchMovie";
import GottaWatch from "@/components/GottaWatch";
import Watched from "@/components/Watched";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: HomePage
    },
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/popular',
        name: 'PopularMovie',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../components/PopularMovie')
    },
    {
        path: '/movie/:id',
        name: 'Movie',
        props: true,
        component: Movie
    },
    {
        path: '/search/name',
        name: 'SearchMovie',
        props: true,
        component: SearchMovie
    },
    {
        path: '/gotta-watch',
        name: 'GottaWatch',
        component: GottaWatch,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/watched',
        name: 'Watched',
        component: Watched,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
