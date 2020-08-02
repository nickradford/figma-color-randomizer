import * as Color from "color";

import { CMD } from "../constants";
import { getCurrentSelection } from "../util/selection";
import { setFillOnNode } from "../util/node";
import { getRandomColorInGradient } from "../util/color";
import { selectionRequired } from "../validators/selection-required";
import { IFigmaPluginCommand } from "../types";

export const RandomInGradient: IFigmaPluginCommand = {
  key: CMD.RANDOM_IN_GRADIENT,
  fn: async ({ data }) => {
    const from = Color(data.fromColor);
    const to = Color(data.toColor);
    getCurrentSelection().map((node) => {
      const newColor = getRandomColorInGradient(from, to);
      setFillOnNode(node, newColor);
    });
    return;
  },
  validators: [selectionRequired()],
};
