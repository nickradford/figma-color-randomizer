import { emit } from "@create-figma-plugin/utilities";
import { EVENTS } from "../constants";

// type lengthValidator = (n: number) => boolean;

// /**
//  *
//  * @param fn The function to call should the length validation pass
//  * @param length The min length of the selection, or a function which computes the validity when passed the length of the selection
//  * @param message An error message to emit, defaults to "Requires selection"
//  */
// export function validateSelectionLength(
//   fn: (arg0: any) => any,
//   length?: number | lengthValidator,
//   message?: string
// ) {
//   if (length === undefined) {
//     length = 1;
//   }

//   return (args: any) => {
//     emit(EVENTS.VALIDATION_START);
//     let valid = false;
//     const selectionLength = figma.currentPage.selection.length;

//     if (typeof length === "number") {
//       valid = selectionLength >= length;
//     } else if (typeof length === "function") {
//       valid = length(selectionLength);
//     }
//     emit(EVENTS.VALIDATION_END);

//     if (valid) {
//       setTimeout(async () => {
//         try {
//           const e = await fn(args);
//         } catch (e) {
//           emit(EVENTS.ERROR, {
//             message: "Unexpected error in closure execution",
//           });
//         }
//       }, 100);
//     } else {
//       emit(EVENTS.ERROR, { message: message || "Requires selection" });
//     }
//   };
// }

/**
 * Helper to get the current selection
 */
export function getCurrentSelection() {
  return figma.currentPage.selection;
}
