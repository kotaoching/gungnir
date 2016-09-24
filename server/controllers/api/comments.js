import * as models from '../../models'

const Comment = models.Comment
const Article = models.Article

export async function list(ctx, next) {
  const slug = ctx.params.slug
  const article = await Article.findOne({
    attributes: ['id'],
    where: {
      slug: slug
    }
  })
  const comments = await Comment.findAll({
    attributes: ['id', 'username', 'email', 'website', 'content', 'created_at', 'updated_at'],
    where: {
      article_id: article.id,
      // parent_id: {
      //   $eq: null
      // },
      is_delete: false
    },
    order: [
      ['created_at', 'ASC']
    ]
  })

  ctx.body = {
    data: comments
  }
}

export async function create(ctx, next) {
  const username = ctx.request.body.username
  const email = ctx.request.body.email
  const website = ctx.request.body.website
  const content = ctx.request.body.content
  const articleid = ctx.request.body.articleid

  if (!username || !content) {
    ctx.status = 400
    ctx.body = {
      status: 400,
      message: 'Bad Request',
      description: 'The username and content is required, and must be not void'
    }

    return
  }

  try {
    const comment = await Comment.create({
      username: username,
      email: email,
      website: website,
      content: content,
      article_id: articleid
    })

    ctx.status = 200
    ctx.body = {
      status: 200,
      message: 'OK',
      description: 'The comment create success',
      data: comment
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      status: 500,
      message: 'Internal Server Error',
      description: 'Failed to create the comment'
    }
  }
}

export async function update(ctx, next) {
  const content = ctx.request.body.content

  const comment = await Comment.update({
    content: content
  })
  .catch(function(err) {
    console.log(err)
  })
}

// export async function delete(ctx, next) {
//
// }
