import { CMD } from "./constants";

type FigmaPluginCommandHandler = (args?: any) => void;

export type FigmaPluginCommandValidator = (
  fn: FigmaPluginCommandHandler,
  ...args: any[]
) => void;

export interface IFigmaPluginCommand {
  key: CMD;
  fn: (...args: any) => Promise<void>;
  validators?: (() => [boolean, string?])[];
}
