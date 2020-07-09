import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import ProductsIndex from '../views/ProductsIndex.vue';
import ProductsShow from '../views/ProductsShow.vue';
import ProductsEdit from '../views/ProductsEdit.vue';
import ProductsNew from '../views/ProductsNew.vue';
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
import Signup from '../views/Signup.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/products',
    name: 'products-index',
    component: ProductsIndex
  },
  {
    path: '/products/new',
    name: 'products-new',
    component: ProductsNew
  },
  {
    path: '/products/:id',
    name: 'products-show',
    component: ProductsShow
  },
  {
    path: '/products/:id/edit',
    name: 'products-edit',
    component: ProductsEdit
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
