#!/usr/bin/env node
import Koa from 'koa'
import path from 'path'
import middlewareRegister from '../platforms/server/middlewareRegister'
import webpack from 'webpack'
import KWM from 'koa-webpack-middleware'
import chokidar from 'chokidar'
import webpackConfig from '../webpack.development'
import config from '../platforms/common/config'

process.env.NODE_ENV = 'development'
console.log('Waiting for webpacking ...')
require('babel-polyfill')
require('babel-core/register')({
  plugins: [
    ['babel-plugin-transform-require-ignore', {
      extensions: ['.styl', '.css']
    }],
    ['inline-replace-variables', {
      __SERVER__: true
    }]
  ]
})
require('asset-require-hook')({
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'tif', 'tiff', 'webp'],
  name: '/build/[name].[ext]',
  limit: 10000
})

const app = new Koa()
const devMiddleware = KWM.devMiddleware
const hotMiddleware = KWM.hotMiddleware
const compiler = webpack(webpackConfig)
const devMiddlewareInstance = devMiddleware(compiler, {
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: false
  },
  publicPath: '/build/',
  stats: {
    colors: true
  }
})
const hotMiddlewareInstance = hotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
})

app.env = 'development'
app.use(devMiddlewareInstance)
app.use(hotMiddlewareInstance)
middlewareRegister(app) // reg middleware
// error logger
app.on('error', function (err, ctx) {
  console.log('error occured:', err.stack)
})

// listen
const watcher = chokidar.watch([
  path.join(__dirname, '../app'),
  path.join(__dirname, '../platforms')
])
watcher.on('ready', function () {
  watcher.on('all', function (e, p) {
    console.log('Clearing module cache')
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\](app|platforms)[\/\\]/.test(id)) delete require.cache[id];
    });
  })
})
let isListened = false
compiler._plugins['after-compile'].push(function (compilation, callback) {
  callback()
  !isListened && app.listen(config.port, function () {
    console.log('App started, at port %d, CTRL + C to terminate', config.port)
    isListened = true
  })
})
