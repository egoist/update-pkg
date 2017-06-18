import test from 'ava'
import {execSync} from 'child_process'
import Pkg from '../'

test.after('create package.json', () => {
	execSync('rm -f fixture/empty/package.json')
})

test('default', async t => {
	const pkg = new Pkg('./fixture/default')
	pkg.set('foo.bar', 'hello')
	t.is(pkg.get('name'), 'xxx')
	t.is(pkg.get('foo.bar'), 'hello')
})

test('create package.json', async t => {
	const pkg = new Pkg('./fixture/empty', {create: true})
	pkg.set('foo', 'bar')
	t.is(pkg.get('foo'), 'bar')
})

test('append', t => {
	const pkg = new Pkg('./fixture/append')
	pkg.append('foo', 'a')
	pkg.append('foo', 'b')
	t.deepEqual(pkg.get('foo'), ['a', 'b'])
})

test('preppend', t => {
	const pkg = new Pkg('./fixture/prepend')
	pkg.prepend('foo', 'a')
	pkg.prepend('foo', 'b')
	t.deepEqual(pkg.get('foo'), ['b', 'a'])
})

test('save', async t => {
	const pkg = new Pkg('./fixture/save')
	pkg.set('foo', 'foo')
	await pkg.save()
	t.deepEqual(require('./fixture/save/package.json'), {foo: 'foo', bar: 'bar'})
})
