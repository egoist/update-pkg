'use strict'

var fs = require('fs')
var fsPromise = require('fs-promise')
var path = require('path')

function pjson(dir) {
	dir = dir || process.cwd()
	return path.resolve(dir, 'package.json')
}

module.exports.data = function data(dir) {
	return require(pjson(dir))
}

module.exports.update = function update(newData, dir) {
	var content = JSON.stringify(newData, null, 2)
	return fsPromise.writeFile(pjson(dir), content, 'utf8')
}

module.exports.updateSync = function updateSync(newData, dir) {
	var content = JSON.stringify(newData, null, 2)
	return fs.writeFileSync(pjson(dir), content, 'utf8')
}
