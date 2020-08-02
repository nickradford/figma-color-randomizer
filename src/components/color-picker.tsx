// src/components/color-picker.ts

/** @jsx h */

import { h } from "preact";
import { useState } from "preact/hooks";
import { SketchPicker } from "react-color";
import { Text, VerticalSpace, Textbox } from "@create-figma-plugin/ui";
import * as Color from "color";

import { isValidColorString } from "../util/color";

interface ColorPickerProps {
  label: string;
  color: string;
  onColorChange: (color: string) => void;
  style?: string | { [key: string]: string | number };
}

export default function ColorPicker(props: ColorPickerProps) {
  let color = Color(props.color);
  return (
    <div style={props.style}>
      <Text>{props.label}</Text>
      <VerticalSpace space="small" />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            height: 20,
            width: 20,
            background: props.color,
            borderRadius: 2,
            display: "inline-block",
            marginRight: 10,
            border: "1px solid transparent",
            borderColor: props.color === "#fff" ? "#ddd" : "transparent",
          }}
        />
        <Textbox
          name="color"
          noBorder
          onChange={(e) => {
            props.onColorChange(e.color);
          }}
          value={props.color}
        />
      </div>
    </div>
  );
}
