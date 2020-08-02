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

import { Tabs } from "@create-figma-plugin/ui/lib/components/tabs/tabs";
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import { SketchPicker } from "react-color";

import ColorPicker from "./components/color-picker";
import LinearGradient from "./components/linear-gradient";
import { emit, on } from "@create-figma-plugin/utilities";
import { EVENTS } from "./constants";
import { RandomTab } from "./ui/tabs/random";
import { RandomInGradient } from "./ui/tabs/random-in-gradient";

export default render(Plugin);

function Plugin(props) {
  const [state, setState] = useState({ selectedTab: "Fully Random" });

  const [error, setError] = useState(null);

  // Set up base event handlers
  useEffect(() => {
    on(EVENTS.START_EXECUTION, () => {
      setError(false);
    });

    on(EVENTS.ERROR, (data) => {
      console.log(data);
      setError(data.message);
    });

    on(EVENTS.COMPLETE, () => {
      setError(null);
    });

    on(EVENTS.END_EXECUTION, () => {
      setError(null);
      console.log("event: end_execution");
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
