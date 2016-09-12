import * as models from '../models';

const User = models.User;

export async function register(ctx, next) {
  const username = ctx.request.body.username;
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;
  const password_hash = await User.createPasswordHash(password);

  const user = await User.create({
      username: username,
      email: email,
      password_hash: password_hash
    })
    .catch(function(err) {
      console.log(err);
    });
}

export async function signin(ctx, next) {
  const account = ctx.request.body.account;
  const password = ctx.request.body.password;

  var user;
  if (account.indexOf('@') != -1) {
    user = await User.find({
      where: {
        email: account
      }
    });
  } else {
    user = await User.find({
      where: {
        username: account
      }
    });
  }

  const isAuth = await User.checkPassword(password, user.password_hash);

  if (isAuth) {
    ctx.session.userid = user.id;
    ctx.session.username = user.username;
  }
}

export async function signout(ctx, next) {
  ctx.session.userid = null;
  ctx.session.username = null;
}
