import 'isomorphic-fetch';

export function getArticles() {
  return fetch('api/articles');
}

export function getArticleBySlug(slug) {
  return fetch('/api/articles/' + slug);
}
