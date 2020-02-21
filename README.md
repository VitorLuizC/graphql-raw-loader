# GraphQL raw loader

[![Build Status][3]][4]

Load GraphQL files as raw strings and handle it's import directive & comment statement.

## Installation

Install it using NPM/Yarn.

```sh
# using NPM
npm i -D graphql-raw-loader

# using Yarn
yarn add graphql-raw-loader --dev
```

## Configuration

Add graphql-raw-loader to your webpack configuration:

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-raw-loader'
      }
    ]
  }
}
```

## Usage example

```gql
fragment UserProfile on User {
  # Some fields.
}
```

```gql
query Users {
  users () {
    ...UserProfile @import(from: "./UserProfile.graphql")
  }
}
```

```js
import query from './User.graphl'

export const getUsers = async () => {
  const response = await fetch('/api/graphql', {
    body: JSON.stringify({ query }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const users = await response.json()
  return users
}
```

## Importing on GraphQL

Officially there's no way to import GraphQL files inside each other. Other loaders fixed [it by parsing import statement inside a comment][0].

Also, theres a [thread about implementing import statements][1] on GraphQL. One of the best suggestions is about [using a directive to import fragments][2].

This loader supports both ways. :sunglasses:
### Using comment import statement

```gql
# import "./UserDataFragment.graphql"
# The comment statement above is importing a file with UserDataFragment fragment
# inside it.

query Users {
  users (is_active: True) {
    data {
      ...UserDataFragment
    }
  }
}
```

### Using `@import` directive
```gql
query Users {
  users (is_active: True) {
    data {
      ...
    }
    ...PaginationFragment @import(from: "./PaginationFragment.graphql")
    # The directive above is importing a file with PaginationFragment fragment
    # inside it.
  }
}
```

<!-- Links -->
[0]: https://github.com/samsarahq/graphql-loader#import-statements-in-graphql-files
[1]: https://github.com/facebook/graphql/issues/343
[2]: https://github.com/facebook/graphql/issues/343#issuecomment-322622003
[3]: https://travis-ci.org/VitorLuizC/graphql-raw-loader.svg?branch=master
[4]: https://travis-ci.org/VitorLuizC/graphql-raw-loader
