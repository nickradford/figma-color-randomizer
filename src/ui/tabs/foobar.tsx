// src/ui.ts

/** @jsx h */
import { Container, VerticalSpace, Button } from "@create-figma-plugin/ui";

import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { on, emit } from "@create-figma-plugin/utilities";
import { EVENTS, CMD } from "../../constants";

export function FoobarTab() {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    on(EVENTS.ERROR, () => setRunning(false));
    on(EVENTS.EXECUTION_END, () => setRunning(false));
  }, []);

  return (
    <Container space="small">
      <VerticalSpace space="small" />
      <Button
        onClick={() => {
          emit(EVENTS.EXECUTE_CMD, { type: CMD.FOOBAR });
        }}
        loading={running}
        disabled={running}
      >
        FOOBAR
      </Button>
    </Container>
  );
}
