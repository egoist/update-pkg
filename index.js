'use strict'
const fs = require('fs')
const path = require('path')
const pify = require('pify')
const mkdirp = require('mkdirp')
const dotProp = require('dot-prop')

function resolvePkg(dir) {
	return path.resolve(dir, 'package.json')
}

module.exports = class Pkg {
	constructor(cwd, options) {
		cwd = cwd || './'
		options = options || {}
		this.pkg = resolvePkg(cwd)

		try {
			this.data = require(this.pkg)
		} catch (err) {
			if (options.create && (err.code === 'ENOENT' || err.code === 'MODULE_NOT_FOUND')) {
				mkdirp.sync(cwd)
				this.data = {}
			} else {
				throw err
			}
		}
	}

	set(prop, value) {
		dotProp.set(this.data, prop, value)
		return this
	}

	update(prop, fn) {
		dotProp.set(this.data, prop, fn(this.get(prop)))
		return this
	}

	append(prop, value) {
		this.update(prop, oldValue => (oldValue || []).concat(value))
		return this
	}

	prepend(prop, value) {
		this.update(prop, oldValue => [value].concat((oldValue || [])))
		return this
	}

	get(prop) {
		return dotProp.get(this.data, prop)
	}

	del(prop) {
		dotProp.delete(this.data, prop)
		return this
	}

	has(prop) {
		return dotProp.has(this.data, prop)
	}

	save() {
		return pify(fs.writeFile)(this.pkg, JSON.stringify(this.data, null, 2), 'utf8')
	}

	saveSync() {
		fs.writeFileSync(this.pkg, JSON.stringify(this.data, null, 2), 'utf8')
		return this
	}
}
