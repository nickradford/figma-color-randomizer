// src/components/linear-gradient.ts

/** @jsx h */

import { h } from "preact";
import * as Color from "color";

interface LinearGradientProps {
  from: string | Color;
  to: string | Color;
  style?: { [key: string]: string | number };
}

export default function LinearGradient(props: LinearGradientProps) {
  return (
    <div
      style={{
        ...props.style,
        height: 20,
        borderRadius: 2,
        backgroundImage: `linear-gradient(to right, ${props.from}, ${props.to})`,
      }}
    />
  );
}
