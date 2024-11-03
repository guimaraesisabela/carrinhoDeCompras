import { createApp } from 'vue';
import App from './views/App.vue';
import Cart from './views/Cart.vue';
import router from './router';

createApp(App).use(router).mount('#app');
