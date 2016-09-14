<template>
<form class="comment-form" v-on:submit="formSubmit">
  <div class="form-user ">
    <div class="form-item form-input">
      <input type="text" name="username" title="昵称" placeholder="昵称" v-model="comment.username">
    </div>
    <div class="form-item form-input">
      <input type="text" name="email" title="邮箱" placeholder="邮箱" v-model="comment.email">
    </div>
    <div class="form-item form-input">
      <input type="text" name="website" title="网站" placeholder="网站" v-model="comment.website">
    </div>
  </div>
  <div class="form-content">
    <textarea class="form-textarea content" name="content" rows="2" title="评论内容" placeholder="评论内容" v-model="comment.content"></textarea>
  </div>
  <button class="button">发表评论</button>
</form>
</template>

<style lang="sass" scoped>
</style>

<script>
import { addComment } from '../api';

export default {
  props: ['article'],
  data() {
    return {
      comment: {
        username: '',
        email: '',
        website: '',
        content: ''
      }
    }
  },
  methods: {
    formSubmit(event) {
      event.preventDefault();
      this.addComment();
    },
    addComment() {
      const username = this.comment.username.trim();
      const email = this.comment.email.trim();
      const website = this.comment.website.trim();
      const content = this.comment.content.trim();
      const articleid = this.article.id;

      if (username && content) {
        const data = JSON.stringify({
          username: username,
          email: email,
          website: website,
          content: content,
          articleid: articleid
        });

        addComment(this.$route.params.slug, data).then(response => {
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
