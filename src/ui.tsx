// src/ui.ts

/** @jsx h */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import {
  render,
  Container,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";

import { Tabs } from "@create-figma-plugin/ui/lib/components/tabs/tabs";
import { on } from "@create-figma-plugin/utilities";

import { EVENTS } from "./constants";
import { useLifecycleLogging } from "./util/use-lifecycle-logging";
import { RandomTab } from "./ui/tabs/random";
import { RandomInGradient } from "./ui/tabs/random-in-gradient";
import { FoobarTab } from "./ui/tabs/foobar";

export default render(Plugin);

function Plugin() {
  const [state, setState] = useState({ selectedTab: "Fully Random" });

  const [error, setError] = useState(null);

  useLifecycleLogging();

  // Set up base event handlers
  useEffect(() => {
    on(EVENTS.EXECUTION_START, () => {
      setError(false);
    });

    on(EVENTS.ERROR, (data) => {
      setError(data.message);
    });

    on(EVENTS.COMPLETE, () => {
      setError(null);
    });

    on(EVENTS.EXECUTION_END, () => {
      setError(null);
    });
  }, []);

  return (
    <div>
      <Tabs
        name="selectedTab"
        onChange={setState}
        options={[
          { value: "Fully Random", view: <RandomTab /> },
          {
            value: "Random In Gradient",
            view: <RandomInGradient />,
          },
          {
            value: "Random From Color Set",
            view: (
              <div>
                <Text>Randomize object fills from list of selected colors</Text>
              </div>
            ),
          },
          {
            value: "Debug",
            view: <FoobarTab />,
          },
        ]}
        value={state.selectedTab}
      />
      <Container space="small">
        <VerticalSpace space="large" />
        {error && <Text>Error: {error}</Text>}
      </Container>
    </div>
  );
}
