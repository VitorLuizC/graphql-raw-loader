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
  const stats = await compile(file)
  const modules = stats.toJson().modules
  const output = modules[modules.length - 1].source
  context.is(output, source)
})
