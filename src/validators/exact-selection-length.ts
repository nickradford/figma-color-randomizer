import { getCurrentSelection } from "../util/selection";

export function exactSelectionLength(
  selectionLength: number,
  message: string = `Must contain exactly ${selectionLength} elements`
): ValidatorFunction {
  return () => {
    const selection = getCurrentSelection();
    if (selection.length === selectionLength) {
      return [true, null];
    }
    return [false, message];
  };
}
