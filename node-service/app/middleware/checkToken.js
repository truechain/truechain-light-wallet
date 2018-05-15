
module.exports = (options, app) => {
    return async function(ctx, next) {
        await next()
        //   console.log('checkToken啊啊啊');
          // console.log(ctx.request.header.token);
          
          // ctx.body = stream
          // ctx.set('Content-Encoding', 'gzip')
    }
}