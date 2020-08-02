import { IFigmaPluginCommand } from ".";
import { CMD } from "../constants";

export const Foobar: IFigmaPluginCommand = {
  key: CMD.FOOBAR,
  fn: async () => {
    console.log("foobar");
  },
};
