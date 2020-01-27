import datalize from 'datalize';

datalize.set('autoValidate', true);

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof datalize.Error) {
      ctx.status = 400;
      ctx.body = err.toJSON();
    } else {
      ctx.status = 400;
      ctx.body = `Error: ${err.message}`;
    }
  }
};
