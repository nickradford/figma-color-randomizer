import { CMD } from "../constants";

type Validator = [FigmaPluginCommandValidator, any?, any?];

export interface IFigmaPluginCommand {
  key: CMD;
  fn: () => void;
  validator?: Validator;
}

export * from "./randomize";
export * from "./foobar";
