<template>
<div class="main">
  <div class="container">
    <div class="article-thorough">
      <h2 class="title">{{article.title}}</h2>
      <div class="content" v-html="article.content_html"></div>
    </div>
    <div v-if="!commentsFetching">
      <div class="article-comment">
        <form class="comment-form">
          <div class="form-user ">
            <div class="form-item form-input">
              <input type="text" name="username" title="昵称" placeholder="昵称" v-model="newComment.username">
            </div>
            <div class="form-item form-input">
              <input type="text" name="email" title="邮箱" placeholder="邮箱" v-model="newComment.email">
            </div>
            <div class="form-item form-input">
              <input type="text" name="website" title="网站" placeholder="网站" v-model="newComment.website">
            </div>
          </div>
          <div class="form-content">
            <textarea class="form-textarea content" name="content" rows="2" title="评论内容" placeholder="评论内容" v-model="newComment.content"></textarea>
          </div>
          <button class="button" v-on:click="addComment">发表评论</button>
        </form>
        <div class="comment-list">
          <div class="comment" v-for="comment in comments" :key="comment.id">
            <span class="comment-avatar">
            </span>
            <div class="comment-body">
              <div class="meta">
                <a :href="comment.website">{{comment.username}}</a>
              </div>
              <div class="content">{{comment.content}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass" scoped>
</style>

<script>
import { getArticleBySlug, getComments, addComment } from '../api';

export default {
  data() {
    return {
      articleFetching: true,
      commentsFetching: true,
      article: {
        title: '',
        content_html: ''
      },
      comments: [],
      newComment: {
        username: '',
        email: '',
        website: '',
        content: ''
      }
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
      this.articleFetching = true;
      this.commentsFetching = true;

      getArticleBySlug(this.$route.params.slug).then(response => {
        if (response.ok) {
          response.json().then(json => {
            that.article = json.data;
            this.articleFetching = false;
          });
        }
      }, error => {
        console.log(error);
      });

      getComments(this.$route.params.slug).then(response => {
        if (response.ok) {
          response.json().then(json => {
            that.comments = json.data;
            this.commentsFetching = false;
          });
        }
      }, error => {
        console.log(error);
      });
    },

    addComment(event) {
      event.preventDefault();
      const username = this.newComment.username.trim();
      const email = this.newComment.email.trim();
      const website = this.newComment.website.trim();
      const content = this.newComment.content.trim();
      const articleid = this.article.id;
      const data = `username=${username}&email=${email}&website=${website}&content=${content}&articleid=${articleid}`;

      if (username && content) {
        addComment(this.$route.params.slug, data).then(response => {
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
