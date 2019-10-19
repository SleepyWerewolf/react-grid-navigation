export type Direction = 'up' | 'down' | 'left' | 'right';

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
