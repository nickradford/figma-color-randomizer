/** @jsx h */

import { Container, VerticalSpace, Button } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import ColorPicker from "../../components/color-picker";
import LinearGradient from "../../components/linear-gradient";
import { emit, on, setRelaunchButton } from "@create-figma-plugin/utilities";
import { EVENTS, CMD } from "../../constants";
import { isValidColorString } from "../../util/color";

export function RandomInGradient() {
  const [colorState, setColorState] = useState({ from: "ivory", to: "pink" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("setup");
    on("RUNNING", () => {
      console.log("running");
    });

    on(EVENTS.ERROR, () => {
      alert("error");
      setLoading(false);
    });
    on(EVENTS.EXECUTION_END, () => {
      setLoading(false);
    });
  }, []);

  const handleSaveClick = () => {
    alert("not implemented");
  };
  const handleClick = () => {
    setLoading(true);
    emit(EVENTS.EXECUTE_CMD, {
      type: CMD.RANDOM_IN_GRADIENT,
      data: {
        fromColor: colorState.from,
        toColor: colorState.to,
      },
    });
  };

  return (
    <Container space="small">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <VerticalSpace space="small" />
        <div style={{ display: "flex", flex: 1 }}>
          <ColorPicker
            label="From"
            color={colorState.from}
            onColorChange={(color) => {
              if (isValidColorString(color)) {
                setColorState({ ...colorState, from: color });
              }
            }}
            style={{ marginRight: 20 }}
          />
          <ColorPicker
            label="To"
            color={colorState.to}
            onColorChange={(color) => {
              if (isValidColorString(color)) {
                setColorState({ ...colorState, to: color });
              }
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <LinearGradient
            style={{ marginTop: 10, flex: 1 }}
            from={colorState.from}
            to={colorState.to}
          />
        </div>
        <footer
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button secondary onClick={handleSaveClick}>
            Save Gradient
          </Button>
          <Button onClick={handleClick} loading={loading} disabled={loading}>
            Randomize
          </Button>
        </footer>
      </div>
    </Container>
  );
}
