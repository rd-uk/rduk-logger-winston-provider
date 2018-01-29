/**
 * MIT License
 *
 * Copyright (c) 2016 - 2017 RDUK <tech@rduk.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict'

const extend = require('extend')
const type = require('@rduk/configuration/lib/sections/field/type')
const pkg = require('../../package')

const DEFAULT = {
  factories: {
    files: `${pkg.name}/lib/factories/files`,
    console: `${pkg.name}/lib/factories/console`
  },
  level: 'info',
  transports: {
    console: false
  }
}

let WinstonSection = function (section) {
  let config = extend(true, DEFAULT, section)

  this.level = config.level
  this.transports = []
  Object.keys(config.transports).forEach(key => {
    if (config.factories.hasOwnProperty(key) && !!config.transports[key]) {
      let factory = type.load(config.factories[key])
      let transports = factory.create(config.transports[key])
      this.transports.push.apply(this.transports, transports)
    }
  })
}

module.exports = WinstonSection
