'use strict'

const test = require('ava')
const { escape, compile } = require('../util')

const source = 'module.exports = ' +
  'require(\'./fragment.graphql\') + '
  + escape(`"

query Test ($name: String!) {
  tests {
    ...TestFragment
  }
}
"`)

test('Handle comment import statement', async (context) => {
  const file = __dirname + '/query.graphql'
  context.is(await compile(file), source)
})
