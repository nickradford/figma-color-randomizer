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
