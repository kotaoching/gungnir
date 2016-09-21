<template>
<form class="article-form" v-on:submit="formSubmit">
  <div class="form-field form-title">
    <input type="text" name="title" placeholder="标题" v-model="article.title">
  </div>
  <div class="form-field form-slug">
    <input type="text" name="slug" placeholder="链接" v-model="article.slug">
  </div>
  <div class="form-field form-content">
    <textarea class="form-textarea content" name="content" title="文章正文" placeholder="文章正文" v-model="article.content"></textarea>
  </div>
  <div class="form-check form-publish">
    <input type="checkbox" v-model="article.publish" v-bind:true-value="true" v-bind:false-value="false">
    <label for="checkbox">是否发布</label>
  </div>
  <div class="form-submit">
    <button class="button">创建</button>
  </div>
</form>
</template>

<style lang="sass" scoped>
</style>

<script>
import { addArticle } from '../api';

export default {
  props: {
    type: String,
    article: {
      type: Object,
      default() {
        return {
          title: '',
          slug: '',
          content: '',
          publish: false
        };
      }
    }
  },
  methods: {
    formSubmit(event) {
      event.preventDefault();
      this.addArticle();
    },
    addArticle() {
      const title = this.article.title.trim();
      const slug = this.article.slug.trim();
      const content = this.article.content.trim();
      const publish = this.article.publish;

      if (title && content) {
        const data = JSON.stringify({
          title: title,
          slug: slug,
          content: content,
          publish: publish
        });

        addArticle(data).then(response => {
          if (response.ok) {
            response.json().then(json => {
              console.log(json);
            });
          }
        }, error => {
          console.log(error);
        });
      }
    }
  }
}
</script>
