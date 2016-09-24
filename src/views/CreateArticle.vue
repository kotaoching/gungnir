<template>
<div class="create-article">
  <div class="container">
    <h2>CreateArticle</h2>
    <article-form type="create"></article-form>
  </div>
</div>
</template>

<style lang="sass" scoped>
</style>

<script>
import ArticleForm from '../components/ArticleForm.vue'

export default {
  components: {
    ArticleForm
  }
}
</script>
