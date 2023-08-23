import type { Operation, Exchange } from '@urql/core';
import { pipe, tap } from 'wonka';

const DEFAULT_REFETCH_INTERVAL = 5 * 60 * 1000;

/** Input parameters for the {@link refetchIntervalExchange}. */
export interface Options {
  /**
   * The time to wait before refetching a query, in milliseconds.
   * 
   * @defaultValue `300_000` - 5 min
   */
  refetchInterval?: number;
}

interface OperationAndTimeoutId {
  operation: Operation,
  timeoutId: number,
}

/** Exchange factory that refetches all queries on an interval.
 *
 * @param options - An {@link Options} configuration object.
 * @returns the created refetch-interval {@link Exchange}.
 *
 * @example
 * ```ts
 * refetchIntervalExchange({
 *   // Refetch every second.
 *   refetchInterval: 1000,
 * });
 * ```
 */
export const refetchIntervalExchange = (options: Options): Exchange => {
  return ({ client, forward }) => {
    const operations = new Map<number, OperationAndTimeoutId>();
    const refetchInterval = options.refetchInterval ?? DEFAULT_REFETCH_INTERVAL;


    return (ops$) => {
      if (typeof window === 'undefined') {
        return forward(ops$);
      }

      const processIncomingOperation = (op: Operation) => {
        const currentOperationAndTimeout = operations.get(op.key);

        if (op.kind === 'query') {
          if (currentOperationAndTimeout) {
            clearTimeout(currentOperationAndTimeout.timeoutId);
            operations.delete(op.key);
          }
          const timeoutId = setTimeout(() => {
            const requestOperation = client.createRequestOperation('query', op, op.context);
            client.reexecuteOperation(requestOperation);
          }, refetchInterval);
          operations.set(op.key, {operation: op, timeoutId});
        }

        if (op.kind === 'teardown' && currentOperationAndTimeout) {
          clearTimeout(currentOperationAndTimeout.timeoutId);
          operations.delete(op.key);
        }
      };

      return forward(pipe(ops$, tap(processIncomingOperation)));
    };
  };
};