# React Library for Grid Navigation

`react-grid-navigation` is a React component/library that uses [CSS Grids](https://css-tricks.com/snippets/css/complete-guide-grid/) to create a grid-based navigation system using your mouse and keyboard (and gamepad in the future!). This project started out as game UI prototype; while PC games are typically played with keyboard + mouse, the modern gamer craves options, and many choose to play with gamepads.

Typically there's a React library for almost any UI scenario imagineable, so I was quite surprised to see there was no standardized tool for gamepad-based navigation of UI...so I decided to try writing my own! 

`react-grid-navigation` suppports seamless switching between mouse hovers and keyboard navigation; if you hover over a tile with your mouse, you can switch to keyboard and continuing navigating from where you last hovered.

If none of this makes any sense, check out the [demo app](http://sleepywerewolf.grid-navigation.surge.sh/) and you'll hopefully see what I'm talking about!

## Usage
See [App.tsx](https://github.com/SleepyWerewolf/react-grid-navigation/blob/master/src/App.tsx) for several examples on how to use the `FocusGrid` component

## TODO
This project is still a WIP, so I expect the laundry list below to keep growing.

- [ ] Tests (I am a bad dev and did not TDD)
- [ ] Hook up gamepad input (the irony that this is missing)
- [ ] Implement `action`s for GridItems; you can focus on them, now let's make them do something when you click on them!
- [ ] Build variable-height layouts
- [ ] Customized styling
- [ ] Cleaner API; the props for `FocusGrid` are based on CSS Grids, but ideally it should be completely platform agnostic
