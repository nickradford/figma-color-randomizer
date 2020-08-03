import { CMD, EVENTS } from "../constants";
import { emit } from "@create-figma-plugin/utilities";
import { IFigmaPluginCommand } from "../types";

export * from "./randomize";
export * from "./foobar";
export * from "./random-in-gradient";

export async function ExecuteCommand(command: IFigmaPluginCommand, args: any) {
  // validation
  emit(EVENTS.VALIDATION_START);
  let hasErrors = false;
  command.validators.some((validator) => {
    const [res, error] = validator();

    if (res === false) {
      emit(EVENTS.EXECUTION_END);
      emit(EVENTS.ERROR, { message: error });
      hasErrors = true;
      return hasErrors;
    }
    return false;
  });
  emit(EVENTS.VALIDATION_END);
  if (hasErrors) {
    return;
  }
  // execution
  emit(EVENTS.EXECUTION_START);

  setTimeout(async () => {
    await command.fn(args);
    emit(EVENTS.EXECUTION_END);
  }, 100);
}
