import { showUI, on, emit } from "@create-figma-plugin/utilities";
import * as Color from "color";

import {
  GetRandomColorInRange,
  getRandomColorInGradient,
  getRandomColor,
} from "./util/color";
import { validateSelectionLength, getCurrentSelection } from "./util/selection";
import { setFillOnNode } from "./util/node";
import { EVENTS } from "./constants";

export default function () {
  const colorStyles = figma.getLocalPaintStyles();

  console.log(colorStyles);

  const options = { width: 360, height: 240 };
  const data = { greeting: "hey there" };

  showUI(options, data);

  // Setup Event Handlers
  on(
    EVENTS.RANDOM_IN_GRADIENT,
    validateSelectionLength(
      ({ fromColor, toColor }: { fromColor: string; toColor: string }) => {
        const from = Color(fromColor);
        const to = Color(toColor);
        getCurrentSelection().map((node) => {
          const newColor = getRandomColorInGradient(from, to);
          setFillOnNode(node, newColor);
        });
      },
      1,
      "Invalid selection length, select at least 1 object with a fill"
    )
  );

  on(
    EVENTS.RANDOMIZE,
    validateSelectionLength(
      () => {
        getCurrentSelection().map((node) => {
          setFillOnNode(node, getRandomColor());
        });
      },
      1,
      "Select at least 1 object with a fill property"
    )
  );
}
