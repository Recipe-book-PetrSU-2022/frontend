import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueFeather from 'vue-feather';

import axios from 'axios';

import App from './App.vue';
import router from './router';

const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:3000';

app.use(createPinia());
app.use(router);

app.component(VueFeather.name, VueFeather);

app.mount('#app');
