import { selectionRequired } from "../validators/selection-required";
import { CMD } from "../constants";
import { IFigmaPluginCommand } from "../types";
import { exactSelectionLength } from "../validators/exact-selection-length";

export const Foobar: IFigmaPluginCommand = {
  key: CMD.FOOBAR,
  fn: async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("foobar");
        resolve();
      }, 2000);
    });
  },
  validators: [selectionRequired(), exactSelectionLength(3)],
};
