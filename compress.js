const BLOCK = /\{[\w|\_|\s|\:|\!|\(|\)|\$]*\}/

/**
 * Get GraphQL block.
 * @param {string} [source]
 * @returns {GraphQLBlock[]}
 */
const getIndexes = (source = '', last = 0) => {
  const match = BLOCK.exec(source.substring(last))
  if (!match)
    return []
  const indexes = [ last + match.index, last + match.index + match[0].length ]
  return [ indexes, ...getIndexes(source, indexes[0]) ]
}
