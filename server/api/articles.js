import * as models from '../models';
import md from '../utils/markdown';

const Article = models.Article;

export async function list(ctx, next) {
  const page = parseInt(ctx.params.page) || 1;
  const pageNumber = 8;

  const articles = await Article.findAndCountAll({
    where: {
      is_publish: true
    },
    offset: pageNumber * (page - 1),
    limit: pageNumber,
    order: [
      ['created_at', 'DESC']
    ]
  });

  ctx.body = {
    data: articles
  }
}

export async function show(ctx, next) {
  const slug = ctx.params.slug;
  const article = await Article.findOne({
    where: {
      slug: slug
    }
  });

  if (article) {
    ctx.body = {
      data: article
    }
  } else {
    ctx.status = 404;
    ctx.body = {
      status: 404,
      message: 'Not Found',
      description: 'Article don\'t exists'
    };
  }
}

export async function create(ctx, next) {
  const title = ctx.request.body.title;
  const content = ctx.request.body.content;
  const isPublish = ctx.request.body.is_publish;

  if (!title || !content) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      message: 'Bad Request',
      description: 'The title and content is required, and must be not void'
    };

    return;
  }

  const slug = await Article.createSlug(title);
  const contentHtml = md.render(content);

  try {
    const article = await Article.create({
      title: title,
      slug: slug,
      content: content,
      content_html: contentHtml,
      is_publish: isPublish
    });

    ctx.status = 200;
    ctx.body = {
      status: 200,
      message: 'OK',
      description: 'The article create success'
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      status: 500,
      message: 'Internal Server Error',
      description: 'Failed to create the article'
    };
  }
}

export async function update(ctx, next) {
  const articleid = ctx.request.body.id;
  const title = ctx.request.body.title;
  const content = ctx.request.body.content;
  const contentHtml = md.render(content);
  const isPublish = ctx.request.body.is_publish;

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
    });

    ctx.status = 200;
    ctx.body = {
      status: 200,
      message: 'OK',
      description: 'The article create success'
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      status: 500,
      message: 'Internal Server Error',
      description: 'Failed to create the article'
    };
  }
}
