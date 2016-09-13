<template>
<div class="main">
  <div class="container">
    <h2>CreateArticle</h2>
    <form class="article-form">
      <div class="form-item form-input">
        <input type="text" name="title" title="标题" placeholder="标题" v-model="newArticle.title">
      </div>
      <div class="form-content">
        <textarea class="form-textarea content" name="content" rows="2" title="文章正文" placeholder="文章正文" v-model="newArticle.content"></textarea>
      </div>
      <input type="checkbox" v-model="newArticle.isPublish" v-bind:true-value="true" v-bind:false-value="false">
      <label for="checkbox">发布文章</label>
      <br>
      <button class="button" v-on:click="addArticle">发表评论</button>
    </form>
  </div>
</div>
</template>

<style lang="sass" scoped>
</style>

<script>
import { addArticle } from '../api';

export default {
  data() {
    return {
      newArticle: {
        title: '',
        content: '',
        isPublish: false
      }
    }
  },

  methods: {
    addArticle(event) {
      event.preventDefault();
      const title = this.newArticle.title.trim();
      const content = this.newArticle.content.trim();
      const isPublish = this.newArticle.isPublish;
      const data = `title=${title}&content=${content}&is_publish=${isPublish}`;

      if (title && content) {
        addArticle(data).then(response => {
          if (response.ok) {
            response.json().then(json => console.log(json));
          }
        }, error => {
          console.log(error);
        });
      }
    }
  }
}
</script>
