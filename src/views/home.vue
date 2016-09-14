<template>
<div class="home-view">
  <div class="container">
    <div class="article-list" v-if="articles.length">
      <template v-for="article in articles" :key="article.id">
        <article-item :article="article"></article-item>
      </template>
    </div>
  </div>
</div>
</template>

<style lang="sass" scoped>
</style>

<script>
import { getArticles } from '../api';
import ArticleItem from '../components/ArticleItem.vue';

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
  },
  components: {
    ArticleItem
  }
}
</script>
