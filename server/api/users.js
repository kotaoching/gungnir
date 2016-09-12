import * as models from '../models';

const User = models.User;

export async function me(ctx, next) {
  const userid = ctx.session.userid;
  const user = await User.findOne({
    attributes: ['id', 'username', 'email', 'created_at', 'updated_at'],
    where: {
      id: userid
    }
  });

  ctx.body = user;
}
