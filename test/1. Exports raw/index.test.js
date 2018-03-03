'use strict'

const test = require('ava')
const escape = require('../escape')
const compiler = require('../compiler')

const content = escape(`module.exports = "
query Test ($name: String!) {
  tests {
    id
  }
}
"`)

test('Parses to raw string export', async (context) => {
  const file = __dirname + '/query.graphql'
  const stats = await compiler(file)
  const output = stats.toJson().modules[0].source
  context.is(output, content)
})
