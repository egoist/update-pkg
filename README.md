# update-pkg [![NPM version](https://img.shields.io/npm/v/update-pkg.svg)](https://npmjs.com/package/update-pkg) [![NPM downloads](https://img.shields.io/npm/dm/update-pkg.svg)](https://npmjs.com/package/update-pkg) [![Build Status](https://img.shields.io/circleci/project/EGOIST/update-pkg/master.svg)](https://circleci.com/gh/EGOIST/update-pkg)

> Update package.json

## Install

```bash
$ npm install --save update-pkg
```

## Usage

```js
const pkg = require('update-pkg')

const data = pkg.data()
data.name = 'fancy-package'
pkg.update(data)
```

## CLI

### Install

```bash
$ npm install -g update-pkg
```

### Usage

```bash
$ update-pkg --name fancy-package
```

## API

### .data

Type: `function`

First argument is `dir`,  the directory to resolve `package.json`.

Return the content of `package.json` as object, throw error if not exists. It's basically `require('./package.json')`.

### .update

Type: `function`

First argument is the new data to update `package.json` to.

Second argument is `dir`,  the directory to resolve `package.json`.

Return `undefined`.

### .updateSync

Same options but synchronously.

## License

MIT © [EGOIST](https://github.com/egoist)
