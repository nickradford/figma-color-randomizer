import { showUI, on, emit } from "@create-figma-plugin/utilities";

import { EVENTS } from "./constants";

import * as Commands from "./commands";

export default function () {
  const options = { width: 500, height: 300 };
  const data = {};

  showUI(options, data);

  let CMD_HANDLERS = {};

  for (const command in Commands) {
    CMD_HANDLERS[Commands[command].key] = Commands[command];
  }

  on(EVENTS.PERSIST_DATA, async (data) => {
    await figma.clientStorage.setAsync(data.key, data.value);
    emit(EVENTS.PERSIST_DATA_SUCCESS, data);
  });

  on(EVENTS.FETCH_PERSISTED_DATA, async (data) => {
    const value = await figma.clientStorage.getAsync(data.key);
    emit(EVENTS.FETCH_PERSISTED_DATA_SUCCESS, { key: data.key, value });
  });

  on(EVENTS.EXECUTE_CMD, async (args) => {
    console.log("Known commands", CMD_HANDLERS);
    console.log(EVENTS.EXECUTE_CMD, args);

    if (!args || !("type" in args)) {
      emit(EVENTS.ERROR, {
        message: `EXECUTE_CMD must be called with an object containing a type.`,
      });
      return;
    }
    if (CMD_HANDLERS[args.type]) {
      const handler = CMD_HANDLERS[args.type];

      Commands.ExecuteCommand(handler, args);
    } else {
      emit(EVENTS.ERROR, {
        message: `Invalid CMD type: ${args.type}`,
      });
      return;
    }
  });
}
