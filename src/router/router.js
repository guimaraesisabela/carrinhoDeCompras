import { createRouter, createWebHistory } from 'vue-router';
import Cart from '../views/Cart.vue';

const routes = [
  {
    path: '/cart', 
    name: 'Cart',
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;