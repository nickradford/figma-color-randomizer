import * as Color from "color";
import { cloneObject } from "@create-figma-plugin/utilities";
import { normalizeColor } from "./color";

export function setFillOnNode(node: SceneNode, fill: Color) {
  if ("fills" in node) {
    const fills = cloneObject(node.fills);

    fills[0].color = normalizeColor(fill);

    node.fills = fills;
  } else {
    console.warn("Node doesn't have fills", node);
  }
}
