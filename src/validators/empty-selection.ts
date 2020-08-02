import { getCurrentSelection } from "../util/selection";

export function emptySelection(
  message: string = "A selection is not allowed"
): ValidatorFunction {
  return () => {
    const selection = getCurrentSelection();
    if (selection.length === 0) {
      return [true, null];
    }
    return [false, message];
  };
}
