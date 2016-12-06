'use strict'

global.chai = require('chai')
global.expect = chai.expect

global.mocha = require('mocha')
global.describe = mocha.describe
global.after = mocha.after
global.it = mocha.it
global.beforeEach = mocha.beforeEach

global.PRISMIC_REPO = 'utils-test'
