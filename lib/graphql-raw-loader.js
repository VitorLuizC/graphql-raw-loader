const toRawString = require('./raw-string')

/**
 * Create's a string raw module.
 * @param {string} source GraphQL's file source.
 * @returns {string}
 */
const createRawModule = (source) => {
  const lines = source.split(/\r\n|\n|\r/)
  const module = {
    dependencies: [],
    statements: []
  }

  for (const line of lines) {
    const IMPORT_DIRECTIVE = /^(\s*\.\.\.\s*\w*)\s*\@import\s*\(\s*from\s*:\s*"(.*)"\s*\)(.*)$/
                          // '< ... \\w*> @import ( from : "<.*>" )<.*>'
    const IMPORT_STATEMENT = /^\s*\#\s*import\s*["|'](.*)["|']\s*$/
                          // ' # import [\'|\"]<.*>[\'|\"] '

    if (IMPORT_DIRECTIVE.test(line)) {
      const [ , source, dependency, after ] = IMPORT_DIRECTIVE.exec(line)
      module.statements.push(source + after)
      module.dependencies.push(dependency)
    } else if (IMPORT_STATEMENT.test(line)) {
      const [ , dependency ] = IMPORT_STATEMENT.exec(line)
      module.dependencies.push(dependency)
    } else {
      module.statements.push(line)
    }
  }

  const output = toRawString(module)

  return Promise.resolve(output)
}

/**
 * Webpack loader to transform GraphQL file in a string raw module. It also
 * handle import directives and import comment statements.
 * @param {string} source GraphQL's file source.
 */
function GraphQLRawLoader (source) {
  this.cacheable()

  const done = this.async()

  if (!done)
    throw new Error('GraphQLRawLoader doesn\'t support synchronous processing')

  createRawModule(source)
    .then((module) => done(null, module))
    .catch(done)
}

module.exports = GraphQLRawLoader
