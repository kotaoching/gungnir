<template>
<li :id="`c-${comment.id}`" class="comment">
  <span class="comment-avatar">
  </span>
  <div class="comment-body">
    <div class="meta">
      <a :href="comment.website">{{comment.username}}</a>
    </div>
    <div class="content">{{comment.content}}</div>
  </div>
</li>
</template>


<script>
export default {
  props: ['comment']
}
</script>
