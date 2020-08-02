import { showUI, on, emit } from "@create-figma-plugin/utilities";
import * as Color from "color";

import { getRandomColorInGradient, getRandomColor } from "./util/color";
import { validateSelectionLength, getCurrentSelection } from "./util/selection";
import { setFillOnNode } from "./util/node";
import { EVENTS, CMD } from "./constants";

import * as Commands from "./commands";

export default function () {
  const colorStyles = figma.getLocalPaintStyles();

  console.log(colorStyles);

  const options = { width: 360, height: 240 };
  const data = { greeting: "hey there" };

  showUI(options, data);

  // const CMD_HANDLERS = {
  //   [CMD.RANDOMIZE]: {
  //     fn: () => {
  //       getCurrentSelection().map((node) => {
  //         setFillOnNode(node, getRandomColor());
  //       });
  //     },
  //     validators: [
  //       validateSelectionLength,
  //       1,
  //       "Select at least 1 object with a fill property",
  //     ],
  //   },
  //   [CMD.RANDOM_IN_GRADIENT]: {
  //     fn: ({ data }) => {
  //       const from = Color(data.fromColor);
  //       const to = Color(data.toColor);
  //       getCurrentSelection().map((node) => {
  //         const newColor = getRandomColorInGradient(from, to);
  //         setFillOnNode(node, newColor);
  //       });
  //     },
  //     validators: [validateSelectionLength],
  //   },
  //   [CMD.FOOBAR]: {
  //     fn: () => {
  //       emit(EVENTS.ERROR, { message: "BAZBAT" });
  //     },
  //   },
  // };

  let CMD_HANDLERS = {};

  for (const command in Commands) {
    CMD_HANDLERS[Commands[command].key] = Commands[command];
  }

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

      if (handler.validators) {
        const [validator, ...validatorArgs] = handler.validators;
        await validator(handler.fn, ...validatorArgs)(args);
        emit(EVENTS.EXECUTION_END);
        return;
      } else {
        await handler.fn(args);
        emit(EVENTS.EXECUTION_END);
        return;
      }
    } else {
      emit(EVENTS.ERROR, {
        message: `Invalid CMD type: ${args.type}`,
      });
      return;
    }
  });
}
