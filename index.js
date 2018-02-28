const getLines = (source) => {
  const LINE_BREAK = /\r\n|\r|\n/
  const lines = source.split(LINE_BREAK)
  return lines
}

const importTypes = [
  {
    type: 'IMPORT_DIRECTIVE',
    test: /^(\s*\.\.\.\w*) @import\(from: "(.*)"\)$/
  },
  {
    type: 'COMMENT_IMPORT_STATEMENT',
    test: /^# import "(.*)"$/
  }
]

const getImportType = (line) => importTypes.find((type) => type.test.test(line))

function GraphQLRawLoader (source) {
  this.cacheable()

  const lines = getLines(source)

  const { files, query } = lines.reduce(
    ({ files, query }, line) => {
      const type = getImportType(line)

      if (!type)
        return {
          files,
          query: query + '\n' + line
        }

      if (type.type === 'COMMENT_IMPORT_STATEMENT') {
        const [ , file ] = type.test.exec(line)
        return {
          files: [ ...files, file ],
          query
        }
      }

      if (type.type === 'IMPORT_DIRECTIVE') {
        const [ , statement, file ] = type.test.exec(line)
        return {
          files: [ ...files, file ],
          query: query + '\n' + statement
        }
      }
    },
    { files: [], query: '' }
  )

  const assigments = [
    ...files.map((file) => `require('${file}')`),
    JSON.stringify(query)
  ]
  const output = `module.exports = ${assigments.join(' + ')}`

  return output
}

module.exports = GraphQLRawLoader
