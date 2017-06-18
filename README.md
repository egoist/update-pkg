# update-pkg [![NPM version](https://img.shields.io/npm/v/update-pkg.svg)](https://npmjs.com/package/update-pkg) [![NPM downloads](https://img.shields.io/npm/dm/update-pkg.svg)](https://npmjs.com/package/update-pkg) [![Build Status](https://circleci.com/gh/egoist/update-pkg/tree/master.svg?style=svg)](https://circleci.com/gh/EGOIST/update-pkg)

> Update package.json

## Install

```bash
$ npm install --save update-pkg
```

## Usage

```js
const Pkg = require('update-pkg')

const pkg = new Pkg()
pkg.data //=> package.json object

pkg.set('author.name', 'EGOIST')
pkg.saveSync()
// or Promise
pkg.save().then(/* ... */)
```

## API

### new Pkg(cwd, [options])

Return a new Pkg instance and would resolve `package.json` located at `cwd` folder. Default `cwd` is `./`.

#### options

##### create

Type: `boolean`<br>
Default: `false`

Create `package.json` when it does not exist, otherwise it will throw an error.

### .data

Type: `object`<br>
Default: `{}`

The parsed content of `package.json`.

### .set(keyPath, value)

Set value by the given `keyPath` like `author.name` and `value` like `EGOIST`.

### .update(keyPath, updater)

`updater` is the function to produce the updated value.

### .append(keyPath, value)

Append a `value` to specific keyPath.

### .preppend(keyPath, value)

Prepend a `value` to specific keyPath.

### .get(keyPath)

Get value by the given keyPath.

### .save()

Type: `function`<br>
Return: `Promise`

Save data to `package.json`.

### .saveSync()

Type: `function`<br>
Return: `this`

Save data to `package.json` but synchronously.

## License

MIT © [EGOIST](https://github.com/egoist)
