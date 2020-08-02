import { getCurrentSelection } from "../util/selection";

export function selectionRequired(message: string = "A selection is required") {
  return (): [boolean, string?] => {
    const selection = getCurrentSelection();
    if (selection.length !== 0) {
      return [true, null];
    }
    return [false, message];
  };
}
