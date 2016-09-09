import * as models from '../models';
import md from '../utils/markdown';

const Article = models.Article;

export async function list(ctx, next) {
  const articles = await Article.findAll();
  ctx.body = articles;
}

export async function show(ctx, next) {
  const article = await Article.findOne(ctx.params.id);
  ctx.body = article;
}

export async function create(ctx, next) {
  const title = ctx.request.body.title;
  const content = ctx.request.body.content;
  const content_html = md.render(content);

  const article = await Article.create({
    title: title,
    content: content,
    content_html: content_html
  })
  .catch(function (err){
    console.log(err);
  });
}
