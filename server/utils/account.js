export async function requireAuth(ctx, next) {
  const userid = ctx.session.userid
  const username = ctx.session.username

  if (!userid) {
    ctx.status = 401
    ctx.body = {
      status: 401,
      message: 'Unauthorized',
      description: 'User require'
    }

    return
  }
  await next()
}
