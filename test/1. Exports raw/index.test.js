'use strict'

const test = require('ava')
const { escape, compile } = require('../util')

const content = escape(`module.exports = "
query Test ($name: String!) {
  tests {
    id
  }
}
"`)

test('Parses to raw string export', async (context) => {
  const file = __dirname + '/query.graphql'
  const stats = await compile(file)
  const output = stats.toJson().modules[0].source
  context.is(output, content)
})
