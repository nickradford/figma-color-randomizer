## Lifecycle events

Buttons in the UI should `emit` an `EVENTS.EXECUTE_CMD`, with a type correlating to a CMD in [constants](./src/constants.ts)

```tsx
// src/ui/tabs/random-in-gradient.tsx
emit(EVENTS.EXECUTE_CMD, {
  type: CMD.RANDOM_IN_GRADIENT,
  data: {
    fromColor: colorState.from,
    toColor: colorState.to,
  },
});
```

## Main Thread

Once a `EXECUTE_CMD` event is picked up on the main thread, it will emit the following events as the command is processed.

- VALIDATION_START
- VALIDATION_END
- EXECUTION_START
- EXECUTION_END

## Errors

The main thread could catch an error at multiple points in the execution, and will emit an `ERROR` with a message body of type `{ message: string }`. These can be listened for in the UI.

## Persisting data

Data can be persisted from the UI by emitting a `EVENTS.PERSIST_DATA` message with data of the shape `{ key: string; data: SerializableData }`

```ts
useEffect(() => {
  if (dataFetched) {
    emit(EVENTS.PERSIST_DATA, {
      key: DATA_PERSISTENCE_KEY,
      value: colorState,
    });
  }
}, [colorState, dataFetched]);
```

Data can then be requested from the UI by emitting `EVENTS.FETCH_PERSISTED_DATA`, and listening for an `EVENTS.FETCH_PERSISTED_DATA_SUCCESS` event, which will contain the data.

```ts
emit(EVENTS.FETCH_PERSISTED_DATA, {
  key: DATA_PERSISTENCE_KEY,
});

on(EVENTS.FETCH_PERSISTED_DATA_SUCCESS, (data) => {
  setColorState(data.value);
  setDataFetched(true);
});
```
