import * as Color from "color";

/**
 * A helper to get a random value between two values.
 * @param a the minimum
 * @param b the maximum
 */

function randomIntInRange(a: number, b: number) {
  return Math.floor(randomValueInRange(a, b));
}

function randomValueInRange(a: number, b: number) {
  // swap values so a is less than b
  if (b < a) {
    [a, b] = [b, a];
  }

  return Math.random() * (b - a + 1) + a;
}

export function normalizeColor(color: Color) {
  return color.unitObject();
}

interface HSLColor {
  color: number[];
  model: string;
  valpha: number;
}

function getHSL(color) {
  if (typeof color.hsl === "function") {
    const value = color.hsl();

    return {
      h: value.color[0],
      s: value.color[1],
      l: value.color[2],
    };
  }
  return null;
}

export function getRandomColorInGradient(start: Color, end: Color): Color {
  const p = Math.random();
  const r = start.red() + p * (end.red() - start.red());
  const g = start.green() + p * (end.green() - start.green());
  const b = start.blue() + p * (end.blue() - start.blue());
  return Color({ r, g, b });
}

export function GetRandomColorInRange(fromColor: Color, toColor: Color): Color {
  // console.log(
  //   `Generating random color between ${fromColor.hex()} and ${toColor.hex()}`
  // );

  const fromHSL = getHSL(fromColor);
  const toHSL = getHSL(toColor);

  // console.log(fromHSL, toHSL);

  const out = {
    h: randomValueInRange(fromHSL.h, toHSL.h),
    s: randomValueInRange(fromHSL.s, toHSL.s),
    l: randomValueInRange(fromHSL.l, toHSL.l),
  };

  // console.log(out);

  return Color(out);
}

export function getRandomColor(): Color {
  return Color({
    r: randomIntInRange(0, 255),
    g: randomIntInRange(0, 255),
    b: randomIntInRange(0, 255),
  });
}

export function isValidColorString(colorString: string) {
  return !!Color(colorString);
  // try {
  //   const c = Color(colorString);
  //   return true;
  // } catch (e) {
  //   return false;
  // }
}
