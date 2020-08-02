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
import { EVENTS } from "../../constants";

export function RandomTab(props) {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    // on(EVENTS.START_EXECUTION, () => setRunning(true));
    on(EVENTS.ERROR, () => setRunning(false));
    on(EVENTS.END_EXECUTION, () => setRunning(false));
  }, []);

  const handleClick = () => {
    setRunning(true);
    emit(EVENTS.RANDOMIZE);
  };

  return (
    <Container space="small">
      <div>
        <VerticalSpace space="small" />
        <Button onClick={handleClick} loading={running} disabled={running}>
          Randomize Fills
        </Button>
      </div>
    </Container>
  );
}
