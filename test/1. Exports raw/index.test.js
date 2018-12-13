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
  context.is(await compile(__dirname + '/query.graphql'), content)
})
