# node-securityheaders.io

A node.js library for [Security Headers](https://securityheaders.io).

## Install

```bash
# npm
npm install node-securityheaders.io

# yarn
yarn add node-securityheaders.io
```

## Usage

```js
const securityheaders = require('node-securityheaders.io');

securityheaders('https://example.com').then(result => {
    console.log(result);
}).catch(error => console.error(error));
```
