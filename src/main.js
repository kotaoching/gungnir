require('./assets/stylesheets/core.scss')

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './app.vue'
import Home from './views/Home.vue'
import Article from './views/Article.vue'
import Project from './views/Project.vue'
import Archive from './views/Archive.vue'
import About from './views/About.vue'
import CreateArticle from './views/CreateArticle.vue'
import EditArticle from './views/EditArticle.vue'

Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}

    if (to.hash) {
      position.selector = to.hash
    }

    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }

    return position
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/articles/create',
    component: CreateArticle
  }, {
    path: '/articles/:slug',
    component: Article
  }, {
    path: '/articles/:slug/edit',
    component: EditArticle
  }, {
    path: '/archive',
    component: Archive
  }, {
    path: '/project',
    component: Project
  }, {
    path: '/about',
    component: About
  }]
})

new Vue(Vue.util.extend({
  router
}, App)).$mount('#app')
