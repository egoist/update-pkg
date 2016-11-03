import test from 'ava'
import fs from 'fs'
import {execSync} from 'child_process'
import Pkg from '../'

test.before('main', () => {
	fs.writeFileSync('./package.json', JSON.stringify({name: 'xxx'}), 'utf8')
})

test.after('main', () => {
	execSync('rm -f package.json')
})

test.after('no pkg', () => {
	execSync('rm -f fixture/package.json')
})

test('main', async t => {
	const pkg = new Pkg()
	pkg.set('foo.bar', 'hello')
	await pkg.save()
	t.is(require('./package').name, 'xxx')
	t.is(require('./package').foo.bar, 'hello')
	t.is(pkg.get('foo.bar'), 'hello')
})

test('no pkg', async t => {
	const pkg = new Pkg('./fixture', {create: true})
	pkg.set('foo', 'bar')
	await pkg.save()
	t.is(require('./fixture/package.json').foo, 'bar')
})
