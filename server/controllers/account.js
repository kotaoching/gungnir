import * as models from '../models';

const User = models.User;

export async function signup(ctx, next) {
  const username = ctx.request.body.username;
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;
  const password_hash = await User.createPasswordHash(password);

  const user = await User.create({
    username: username,
    email: email,
    password_hash: password_hash
  })
  .catch(function (err){
    console.log(err);
  });
}

export async function signin(ctx, next) {
  const account = ctx.request.body.account;
  const password = ctx.request.body.password;

  const isSignin = await User.auth(account, password);
}
