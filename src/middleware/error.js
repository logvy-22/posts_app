import datalize from 'datalize';

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof datalize.Error) {
      ctx.status = 400;
      ctx.body = err.toJSON();
    } else {
      ctx.status = err.status || 500;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
      };
      ctx.app.emit('error', err, ctx, err.stack);
    }
  }
};
