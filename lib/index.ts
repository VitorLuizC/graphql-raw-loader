import { loader } from 'webpack';

const getLines = (source: string): string[] => source.split(/\r\n|\n|\r/);

type ImportType = {
  type: string;
  test: RegExp;
};

const types: ImportType[] = [
  {
    type: 'IMPORT_DIRECTIVE',
    test: /^(\s*\.\.\.\w*) @import\(from: "(.*)"\)$/
  },
  {
    type: 'COMMENT_IMPORT_STATEMENT',
    test: /^# import "(.*)"$/
  }
];

const getType = (line: string): ImportType | undefined => types.find((_) => _.test.test(line));

function GraphQLRawLoader (this: loader.LoaderContext, source: string): string {
  this.cacheable();

  let files: string[] = [];

  const lines = getLines(source);

  const reduceLine = (query: string, line: string): string => {
    const type = getType(line);

    if (type && type.type === 'COMMENT_IMPORT_STATEMENT') {
      const [ , file ] = type.test.exec(line);
      files.push(file);
      return query;
    }

    if (type && type.type === 'IMPORT_DIRECTIVE') {
      const [ , statement, file ] = type.test.exec(line);
      files.push(file);
      return query + '\n' + statement;
    }

    return query + '\n' + line;
  };

  const query = lines.reduce(reduceLine, '');

  const assigments = files.map((file) => `require('${file}')`).concat(JSON.stringify(query));

  return `module.exports = ${assigments.join(' + ')}`
}

export default GraphQLRawLoader;
