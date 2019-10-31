/**
 * This file contains enums and definitions that define/constrain
 * how this library handles directions.
 */

export type Direction = 'up' | 'down' | 'left' | 'right';

export const DIRECTIONAL_OFFSETS = {
  up: -1,
  down: 1,
  left: -1,
  right: 1,
}

// TODO: Add gamepad keys
export const DirectionalKeyMap: { [key: string]: Direction | undefined } = {
  arrowup: 'up',
  w: 'up',
  arrowright: 'right',
  d: 'right',
  arrowdown: 'down',
  s: 'down',
  arrowleft: 'left',
  a: 'left',
};

export const getDirection = (key: string) => DirectionalKeyMap[key];
