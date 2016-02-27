#!/usr/bin/env node
'use strict'

var minimist = require('minimist')
var pkg = require('./')
var data = pkg.data()
var argv = minimist(process.argv.slice(2))

for (var key in argv) {
	if (key !== '_') {
		data[key] = argv[key]
	}
}
pkg.update(data)
