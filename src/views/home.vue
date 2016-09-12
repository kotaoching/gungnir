<template>
<div class="main">
  <div class="container">
    <div class="article-list">
      <div class="article" v-for="item in articles.rows" :key="item.id">
        <h2 class="title">
          <router-link :to="`/articles/${item.slug}`">
            {{item.title}}
          </router-link>
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
      loading: false,
      articles: {
        rows: null
      },
      error: null
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
      getArticles().then(function(response) {
        return response.json();
      }).then(function(data) {
        that.articles = data.data;
      }).catch(function(e) {
        console.log("Oops, error");
      });
    }
  }
}
</script>
