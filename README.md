# @aotimme/urql-exchange-refetch-interval

`@aotimme/urql-exchange-refetch-interval` is an exchange for the [`urql`](https://formidable.com/open-source/urql/) GraphQL client that refetches queries on a specified interval.

## Quick Start Guide

First install `@aotimme/urql-exchange-refetch-interval` alongside `urql`:

```sh
yarn add @aotimme/urql-exchange-refetch-interval
# or
npm install --save @aotimme/urql-exchange-refetch-interval
```

Then add it to your `Client`.

You will likely want to put it before the `cacheExchange` since that can filter out operations that you will want to refetch. And you will also want it before any asynchronous exchanges, like the `fetchExchange`.

```js
import { createClient, cacheExchange, fetchExchange } from 'urql';
import { refetchIntervalExchange } from '@aotimme/urql-exchange-refetch-interval';

const client = createClient({
  url: 'http://localhost:3000/graphql',
  exchanges: [refetchIntervalExchange({refetchInterval: 30000}), cacheExchange, fetchExchange],
});
```