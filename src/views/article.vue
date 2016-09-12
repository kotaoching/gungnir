<template>
<div class="main">
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3 home-wrap">
        <h2 class="title">{{article.title}}</h2>
        <div class="content" v-html="article.content_html"></div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass" scoped>
</style>

<script>
import { getArticleBySlug } from '../api';

export default {
  data() {
    return {
      loading: false,
      article: {
        title: null,
        content_html: null
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
      getArticleBySlug(this.$route.params.slug).then(function(response) {
        return response.json();
      }).then(function(data) {
        that.article = data.data;
      }).catch(function(e) {
        console.log("Oops, error");
      });
    }
  }
}
</script>
