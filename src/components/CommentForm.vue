<template>
<form class="comment-form" v-on:submit="formSubmit">
  <div class="form-field form-username">
    <input type="text" name="username" title="昵称" placeholder="昵称" v-model="comment.username">
  </div>
  <div class="form-field form-email">
    <input type="text" name="email" title="邮箱" placeholder="邮箱" v-model="comment.email">
  </div>
  <div class="form-field form-website">
    <input type="text" name="website" title="网站" placeholder="网站" v-model="comment.website">
  </div>
  <div class="form-field form-content">
    <textarea class="form-textarea content" name="content" title="评论内容" placeholder="评论内容" v-model="comment.content"></textarea>
  </div>
  <div class="form-submit">
    <button class="button">评论</button>
  </div>
</form>
</template>

<style lang="sass" scoped>
</style>

<script>
import { addComment } from '../api'

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
      event.preventDefault()
      this.addComment()
    },
    addComment() {
      const username = this.comment.username.trim()
      const email = this.comment.email.trim()
      const website = this.comment.website.trim()
      const content = this.comment.content.trim()
      const articleid = this.article.id

      if (username && content) {
        const data = JSON.stringify({
          username: username,
          email: email,
          website: website,
          content: content,
          articleid: articleid
        })

        addComment(this.$route.params.slug, data).then(response => {
          if (response.ok) {
            response.json().then(json => {
              console.log(json)
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>
