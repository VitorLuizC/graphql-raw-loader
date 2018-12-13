'use strict'

const test = require('ava')
const { escape, compile } = require('../util')

const source = 'module.exports = ' + 'require(\'./fragment.graphql\') + ' + escape(`"
query Test () {
  tests {
    ...TestFragment
  }
}
"`)

test('Handle import directive', async (context) => {
  const file = __dirname + '/query.graphql'
  context.is(await compile(file), source)
})
