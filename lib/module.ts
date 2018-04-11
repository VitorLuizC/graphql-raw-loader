type GraphQLStatementType = {
  name: string,
  expression: RegExp
}

const types: Array<GraphQLStatementType> = [
  {
    name: 'IMPORT_DIRECTIVE',
    expression: /^(\s*\.\.\.\s*\w*)\s*\@import\s*\(\s*from\s*:\s*"(.*)"\s*\)(.*)$/
  },
  {
    name: 'IMPORT_COMMENT',
    expression: /^\s*\#\s*import\s*["|'](.*)["|']\s*$/
  }
]


export type GraphQLModule = {
  dependencies: Array<string>,
  statements: Array<string>
}

export default (content: string) => {
  const module: GraphQLModule = {
    statements: [],
    dependencies: []
  }

  return module
}
