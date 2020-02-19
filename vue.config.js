//跨域配置
module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3300/',
          changeOrigin: true,
          pathRewrite:{
              '^/api':''
          }
        }
      }
    }
  }