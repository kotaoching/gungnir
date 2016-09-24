import 'isomorphic-fetch'

export function getArticles() {
  return fetch('api/articles')
}

export function getArticleBySlug(slug) {
  return fetch(`/api/articles/${slug}`)
}

export function getComments(slug) {
  return fetch(`/api/articles/${slug}/comments`)
}

export function addComment(slug, data) {
  return fetch(`/api/articles/${slug}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  })
}

export function addArticle(data) {
  return fetch('/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  })
}
