import * as models from '../models'
import md from '../utils/markdown'

const Article = models.Article
const User = models.User

export async function list(ctx, next) {
  const page = parseInt(ctx.query.page) || 1
  const pageNumber = 8

  const articles = await Article.findAndCountAll({
    attributes: ['id', 'title', 'slug', 'content_html', 'comments_count', 'created_at', 'updated_at'],
    where: {
      is_publish: true
    },
    include: [{
      model: User,
      as: 'author',
      attributes: ['id', 'username']
    }],
    offset: pageNumber * (page - 1),
    limit: pageNumber,
    order: [
      ['created_at', 'DESC']
    ]
  })

  ctx.body = {
    total: articles.count,
    page: page,
    number: pageNumber,
    data: articles.rows
  }
}

export async function show(ctx, next) {
  const slug = ctx.params.slug
  const article = await Article.findOne({
    attributes: ['id', 'title', 'slug', 'content_html', 'comments_count', 'created_at', 'updated_at'],
    where: {
      slug: slug
    },
    include: [{
      model: User,
      as: 'author',
      attributes: ['id', 'username']
    }]
  })

  if (article) {
    ctx.body = {
      data: article
    }
  } else {
    ctx.status = 404
    ctx.body = {
      status: 404,
      message: 'Not Found',
      description: 'Article don\'t exists'
    }
  }
}

export async function create(ctx, next) {
  const title = ctx.request.body.title
  const content = ctx.request.body.content
  const publish = ctx.request.body.publish

  if (!title || !content) {
    ctx.status = 400
    ctx.body = {
      status: 400,
      message: 'Bad Request',
      description: 'The title and content is required, and must be not void'
    }

    return
  }

  const slug = await Article.createSlug(title)
  const contentHtml = md.render(content)
  const userid = ctx.session.userid

  try {
    const article = await Article.create({
      title: title,
      slug: slug,
      content: content,
      content_html: contentHtml,
      user_id: userid,
      is_publish: publish
    })

    ctx.status = 200
    ctx.body = {
      status: 200,
      message: 'OK',
      description: 'The article create success',
      data: article
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      status: 500,
      message: 'Internal Server Error',
      description: 'Failed to create the article'
    }
  }
}

export async function update(ctx, next) {
  const articleid = ctx.request.body.id
  const title = ctx.request.body.title
  const content = ctx.request.body.content
  const contentHtml = md.render(content)
  const isPublish = ctx.request.body.is_publish

  try {
    const article = await Article.update({
      title: title,
      content: content,
      content_html: contentHtml,
      is_publish: isPublish
    }, {
      where: {
        id: articleid
      }
    })

    ctx.status = 200
    ctx.body = {
      status: 200,
      message: 'OK',
      description: 'The article create success'
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      status: 500,
      message: 'Internal Server Error',
      description: 'Failed to create the article'
    }
  }
}
