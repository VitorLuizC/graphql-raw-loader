import { GraphQLModule } from './module'

const toRawRequire = (dependency: string) => `require('${dependency}')`

const toRawRequires = (dependencies: Array<string>) => {
  const requires = dependencies.map(toRawRequire)
  return requires
}

const toRawSource = (statements: Array<string>) => {
  const source = JSON.stringify(statements.join('\n'))
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
  return source
}

export default (module: GraphQLModule): string => {
  const requires = toRawRequires(module.dependencies)
  const source = toRawSource(module.statements)
  const string = 'module.exports = ' + [ ...requires, source ].join(' + ')
  return string
}
