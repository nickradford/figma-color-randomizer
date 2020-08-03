/** @jsx h */

import {
  Container,
  VerticalSpace,
  Button,
  LoadingIndicator,
} from "@create-figma-plugin/ui";
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import ColorPicker from "../../components/color-picker";
import LinearGradient from "../../components/linear-gradient";
import { emit, on, setRelaunchButton } from "@create-figma-plugin/utilities";
import { EVENTS, CMD } from "../../constants";
import { isValidColorString } from "../../util/color";

const DATA_PERSISTENCE_KEY = "randomInGradient.gradientColors";

export function RandomInGradient() {
  const [colorState, setColorState] = useState({ from: "ivory", to: "pink" });
  const [dataFetched, setDataFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    on(EVENTS.ERROR, () => {
      setLoading(false);
    });
    on(EVENTS.EXECUTION_END, () => {
      setLoading(false);
    });

    emit(EVENTS.FETCH_PERSISTED_DATA, {
      key: DATA_PERSISTENCE_KEY,
    });

    on(EVENTS.FETCH_PERSISTED_DATA_SUCCESS, (data) => {
      setColorState(data.value);
      setDataFetched(true);
    });
  }, []);

  useEffect(() => {
    if (dataFetched) {
      emit(EVENTS.PERSIST_DATA, {
        key: DATA_PERSISTENCE_KEY,
        value: colorState,
      });
    }
  }, [colorState, dataFetched]);

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

  return dataFetched ? (
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
  ) : (
    <LoadingIndicator />
  );
}
