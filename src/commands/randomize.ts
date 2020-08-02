import { CMD } from "../constants";

import { getCurrentSelection } from "../util/selection";
import { setFillOnNode } from "../util/node";
import { getRandomColor } from "../util/color";
import { selectionRequired } from "../validators/selection-required";
import { IFigmaPluginCommand } from "../types";

export const Randomize: IFigmaPluginCommand = {
  key: CMD.RANDOMIZE,
  fn: async () => {
    getCurrentSelection().map((node) => {
      setFillOnNode(node, getRandomColor());
    });
    return;
  },

  validators: [selectionRequired()],
};
