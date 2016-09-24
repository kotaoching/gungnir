<template>
<div class="article-view">
  <div class="container">
    <div class="article-thorough">
      <h2 class="title">{{article.title}}</h2>
      <div class="content" v-html="article.content_html"></div>
    </div>
    <div class="article-comment" v-if="!commentsFetching">
      <comment-form :article="article"></comment-form>
      <ul class="comment-list" v-if="comments.length">
        <template v-for="comment in comments" :key="comment.id">
          <comment-item :comment="comment"></comment-item>
        </template>
      </ul>
    </div>
  </div>
</div>
</template>

<style lang="sass" scoped>
</style>

<script>
import { getArticleBySlug, getComments } from '../api'
import CommentItem from '../components/CommentItem.vue'
import CommentForm from '../components/CommentForm.vue'

export default {
  data() {
    return {
      articleFetching: true,
      commentsFetching: true,
      article: {
        title: '',
        content_html: ''
      },
      comments: []
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
      var that = this
      this.articleFetching = true
      this.commentsFetching = true

      getArticleBySlug(this.$route.params.slug).then(response => {
        if (response.ok) {
          response.json().then(json => {
            that.article = json.data
            this.articleFetching = false
          })
        }
      }, error => {
        console.log(error)
      })

      getComments(this.$route.params.slug).then(response => {
        if (response.ok) {
          response.json().then(json => {
            that.comments = json.data
            this.commentsFetching = false
          })
        }
      }, error => {
        console.log(error)
      })
    }
  },
  components: {
    CommentItem,
    CommentForm
  }
}
</script>
