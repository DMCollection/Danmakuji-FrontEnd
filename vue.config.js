const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  // 修改的配置
  // 将baseUrl: '/api',改为baseUrl: '/',
  baseUrl: "/",
  devServer: {
    proxy: {
      "/api": {
        target: "http://10.0.46.28:8080",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
};
