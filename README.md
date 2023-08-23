# @aotimme/urql-exchange-refetch-interval

`@aotimme/urql-exchange-refetch-interval` is an exchange for the [`urql`](https://formidable.com/open-source/urql/) GraphQL client that refetches queries on a specified interval.

## Quick Start Guide

First install `@aotimme/urql-exchange-refetch-interval` alongside `urql`:

```sh
yarn add @aotimme/urql-exchange-refetch-interval
# or
npm install --save @aotimme/urql-exchange-refetch-interval
```

Then add it to your `Client`, in front of any asynchronous exchanges, like the `fetchExchange`:

```js
import { createClient, cacheExchange, fetchExchange } from 'urql';
import { refetchIntervalExchange } from '@aotimme/urql-exchange-refetch-interval';

const client = createClient({
  url: 'http://localhost:3000/graphql',
  exchanges: [cacheExchange, refetchIntervalExchange({refetchInterval: 30000}), fetchExchange],
});
```