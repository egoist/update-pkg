import test from 'ava'
import fs from 'fs'
import pkg from '../'

test.before(() => {
	fs.writeFileSync('./package.json', JSON.stringify({name: 'xxx'}), 'utf8')
})

test('main', async t => {
	const data = pkg.data('./')
	data.name = 'yep'
	pkg.update(data)
	t.is(require('./package').name, 'yep')
})
