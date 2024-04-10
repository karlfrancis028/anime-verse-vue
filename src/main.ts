import '@/assets/styles/main.scss';
import Components from '@/components/index';

import TruncateReadMore from 'vue-truncate-read-more';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

Object.keys(Components).forEach((key) => {
  app.component(key as keyof typeof Components, Components[key as keyof typeof Components]);
});

app.use(TruncateReadMore);

app.use(createPinia());
app.use(router);

app.mount('#app');
