<template>
<div class="main">
  <div class="container">
    <div class="article-list">
      <div class="article" v-for="item in articles" :key="item.id">
        <h2 class="title">
          <router-link :to="`/articles/${item.slug}`">{{item.title}}</router-link>
        </h2>
        <div class="content">
          <div v-html="item.content_html"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass" scoped>
</style>

<script>
import { getArticles } from '../api';

export default {
  data() {
    return {
      articles: []
    }
  },

  created() {
    this.fetchData()
  },

  watch: {
    '$route': 'fetchData'
  },

  methods: {
    fetchData() {
      var that = this;
      getArticles().then(response => {
        if (response.ok) {
          response.json().then(json => {
            that.articles = json.data;
          });
        }
      }, error => {
        console.log(error);
      });
    }
  }
}
</script>
