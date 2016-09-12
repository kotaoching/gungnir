require('./assets/stylesheets/core.scss');

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './app.vue';
import Home from './views/home.vue';
import Article from './views/article.vue';
import Archive from './views/archive.vue';
import About from './views/about.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    const position = {};

    if (to.hash) {
      position.selector = to.hash;
    }

    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0;
      position.y = 0;
    }

    return position;
  }
};

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/articles/:slug',
    component: Article
  }, {
    path: '/archive',
    component: Archive
  }, {
    path: '/about',
    component: About
  }]
});

new Vue(Vue.util.extend({
  router
}, App)).$mount('#app');
