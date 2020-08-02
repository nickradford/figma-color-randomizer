import { CMD } from "../constants";
import { IFigmaPluginCommand } from "./index";

import {
  getCurrentSelection,
  validateSelectionLength,
} from "../util/selection";
import { setFillOnNode } from "../util/node";
import { getRandomColor } from "../util/color";

export const Randomize: IFigmaPluginCommand = {
  key: CMD.RANDOMIZE,
  fn: async () => {
    getCurrentSelection().map((node) => {
      setFillOnNode(node, getRandomColor());
    });
    return;
  },
  validator: [
    validateSelectionLength,
    1,
    "Select at least 1 object with a fill property",
  ],
};
