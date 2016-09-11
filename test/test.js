import test from 'ava'
import fs from 'fs'
import Pkg from '../'

test.before(() => {
	fs.writeFileSync('./package.json', JSON.stringify({name: 'xxx'}), 'utf8')
})

test('main', async t => {
	const pkg = new Pkg()
	pkg.set('foo.bar', 'hello')
	await pkg.save()
	t.is(require('./package').name, 'xxx')
	t.is(require('./package').foo.bar, 'hello')
	t.is(pkg.get('foo.bar'), 'hello')
})
