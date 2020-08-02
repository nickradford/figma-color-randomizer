// src/ui.ts

/** @jsx h */
import {
  render,
  Container,
  Divider,
  Text,
  VerticalSpace,
  Button,
} from "@create-figma-plugin/ui";

import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { on, emit } from "@create-figma-plugin/utilities";
import { EVENTS, CMD } from "../../constants";

export function RandomTab() {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    on(EVENTS.ERROR, () => setRunning(false));
    on(EVENTS.EXECUTION_END, () => setRunning(false));
  }, []);

  const handleClick = () => {
    setRunning(true);
    emit(EVENTS.EXECUTE_CMD, { type: CMD.RANDOMIZE });
  };

  return (
    <Container space="small">
      <div>
        <VerticalSpace space="small" />
        <Button onClick={handleClick} loading={running} disabled={running}>
          Randomize Fills
        </Button>
        <Button
          onClick={() => {
            emit(EVENTS.EXECUTE_CMD, { type: CMD.FOOBAR });
          }}
          loading={running}
          disabled={running}
        >
          FOOBAR
        </Button>
      </div>
    </Container>
  );
}
