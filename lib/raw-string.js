'use strict'

/**
 * Parses dependency path to require statement.
 * @param {string} dependency
 * @return {string}
 */
const toRawRequire = (dependency) => `require('${dependency}')`

/**
 * Parses dependencies path to require statements.
 * @param {string[]} dependencies
 * @return {string[]}
 */
const toRawRequires = (dependencies) => {
  const requires = dependencies.map(toRawRequire)
  return requires
}

/**
 * Parses source to string and escape unsupported values.
 * @param {string} source
 * @returns {string}
 */
const toRawSource = (source) => {
  const raw = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
  return raw
}

/**
 * Parses module to raw string.
 * @param {{ dependencies: string[], statements: string[] }} module
 * @returns {string}
 */
const toRawString = (module) => {
  const requires = toRawRequires(module.dependencies)
  const source = toRawSource(module.statements.join('\n'))
  const string = 'module.exports = ' + [ ...requires, source ].join(' + ')
  return string
}

module.exports = toRawString
