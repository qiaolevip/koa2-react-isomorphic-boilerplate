#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
try {
  fs.statSync(path. join(__dirname, '../dist'))
} catch (e) {
  console.log(e)
  console.error('pls run `npm run build` first!')
  process.exit(0)
}
process.env.NODE_ENV = 'production'
require('../dist')
