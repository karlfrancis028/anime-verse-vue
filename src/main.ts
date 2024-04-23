import '@/assets/styles/main.scss';
import Components from '@/components/index';

import 'vue3-carousel/dist/carousel.css';
import 'vue-plyr/dist/vue-plyr.css';
import TruncateReadMore from 'vue-truncate-read-more';
import VuePlyr from 'vue-plyr';
import { Carousel, Slide } from 'vue3-carousel'

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

Object.keys(Components).forEach((key) => {
  app.component(key as keyof typeof Components, Components[key as keyof typeof Components]);
});

app.use(TruncateReadMore);
app.use(VuePlyr);
app.use(Carousel);
app.use(Slide);

app.use(createPinia());
app.use(router);

app.mount('#app');
