/*!
 * graphql-raw-loader v0.1.0
 * (c) 2018-present Vitor Luiz Cavalcanti <vitorluizc@outlook.com> (https://vitorluizc.github.io)
 * Released under the MIT License.
 */
'use strict';

const getLines = (source) => source.split(/\r\n|\n|\r/);
const types = [
    {
        type: 'IMPORT_DIRECTIVE',
        test: /^(\s*\.\.\.\w*) @import\(from: "(.*)"\)$/
    },
    {
        type: 'COMMENT_IMPORT_STATEMENT',
        test: /^# import "(.*)"$/
    }
];
const getType = (line) => types.find((_) => _.test.test(line));
function GraphQLRawLoader(source) {
    this.cacheable();
    let files = [];
    const lines = getLines(source);
    const reduceLine = (query, line) => {
        const type = getType(line);
        if (type && type.type === 'COMMENT_IMPORT_STATEMENT') {
            const [, file] = type.test.exec(line);
            files.push(file);
            return query;
        }
        if (type && type.type === 'IMPORT_DIRECTIVE') {
            const [, statement, file] = type.test.exec(line);
            files.push(file);
            return query + '\n' + statement;
        }
        return query + '\n' + line;
    };
    const query = lines.reduce(reduceLine, '');
    const assigments = files.map((file) => `require('${file}')`).concat(JSON.stringify(query));
    return `module.exports = ${assigments.join(' + ')}`;
}

module.exports = GraphQLRawLoader;
