/**
 * Create's a string raw module.
 * @param {string} source GraphQL's file source.
 * @returns {string}
 */
const createRawModule = (source) => {
  const lines = source.split(/\r\n|\n|\r/)
  const module = {
    dependencies: [],
    lines: []
  }

  for (const line of lines) {
    const IMPORT_DIRECTIVE = /^(\s*\.\.\.\s*\w*)\s*\@import\s*\(\s*from\s*:\s*"(.*)"\s*\)(.*)$/
    const IMPORT_STATEMENT = /^\s*\#\s*import\s*["|'](.*)["|']\s*$/

    if (IMPORT_DIRECTIVE.test(line)) {
      const [ , source, dependency, after ] = IMPORT_DIRECTIVE.exec(line)
      module.lines.push(source + after)
      module.dependencies.push(dependency)
    } else if (IMPORT_STATEMENT.test(line)) {
      const [ , dependency ] = IMPORT_STATEMENT.exec(line)
      module.dependencies.push(dependency)
    } else {
      module.lines.push(line)
    }
  }

  return module
}

exports.createRawModule = createRawModule
