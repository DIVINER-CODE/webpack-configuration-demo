const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 复制文件插件
const htmlPlugin = new HtmlWebpackPlugin({
  // 指定复制的文件
  template: './src/index.html',
  // 指定复制出的文件名和存放路径
  filename: './index.html',
})
// 清除 dist 目录文件
const cleanWebpackPlugin = new CleanWebpackPlugin()

// module.exports 为 Node.js 导出语法
module.exports = {
  mode: 'development', // production, development
  // source-map, eval-source-map 仅限在开发模式下使用, 保持运行时行号和源码行号一致, 实际发布时 可设置为 nosources-source-map 或者直接关闭 devtool
  devtool: 'nosources-source-map',
  entry: path.join(__dirname, './src/assets/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/bundle.js',
  },
  // 自动打开浏览器
  devServer: {
    port: 8080,
    host: 'localhost',
    open: true,
  },
  plugins: [
    htmlPlugin,
    cleanWebpackPlugin,
  ],
  module: {
    // webpack 默认只能处理以 .js 结尾的文件
    rules: [
      // 处理 css 后缀文件的 loader
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      // 处理 less 后缀文件的 loader
      {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
      // 处理 图片文件 的 loader. limit 指定图片的大小, 单位字节(byte), 只有 <=limit 的图片才会被转为 base64 格式的图片
      {test: /\.jpg|png|gif$/, use: ['url-loader?limit=100&&name=images/[hash:8].[name].[ext]&esModule=false']},
      // 处理 高级JS语法的 loader, 需要配置 babel.config.js 文件
      {test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},
      // 处理 html 中的 img 打包后路径问题
      {test:  /\.(htm|html)$/i, use: ['html-withimg-loader']},
    ],
  },
  resolve: {
    alias: {
      // 配置 webpack @ 表示 src 目录
      '@': path.join(__dirname, './src/')
    }
  }
}