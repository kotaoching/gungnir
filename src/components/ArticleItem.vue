<template>
<div :id="`a-${article.id}`" class="article">
  <h2 class="title">
    <router-link :to="`/articles/${article.slug}`">{{article.title}}</router-link>
  </h2>
  <div class="content">
    <div v-html="article.content_html"></div>
  </div>
</div>
</template>


<script>
export default {
  props: ['article']
}
</script>
