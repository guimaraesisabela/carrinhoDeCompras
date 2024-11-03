import { createRouter, createWebHistory } from 'vue-router';
import App from './views/App.vue';
import Cart from './views/Cart.vue'; 

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
