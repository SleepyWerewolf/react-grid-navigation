import React, { Fragment, useState } from 'react';

import './App.css';
import { FocusGrid } from './components/FocusGrid';

const App: React.FC = () => {
  const [ focusIndex, setFocusIndex ] = useState(0);

  return (
    <Fragment>
      <h1>Standard 4x4 Grid</h1>
      <h2>Hover over any of the grids to see focus change. You can also use WASD or Arroy Keys to navigate once the grid is focused!</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <FocusGrid
          columnConfig={[{ width: '1fr' }, { width: '1fr' }, { width: '1fr' }, { width: '1fr' }]}
          rowConfig={[{ height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }]}
          isFocused={true}
          items={[
            {}, {}, {}, {},
            {}, {}, {}, {},
            {}, {}, {}, {},
            {}, {}, {}, {},
          ]}
        />
      </div>

      <h1>Variable-Width Layout Grid</h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <FocusGrid
          columnConfig={[{ width: '1fr' }, { width: '1fr' }, { width: '1fr' }]}
          rowConfig={[{ height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }]}
          isFocused={false}
          items={[
            {}, { width: 2 },
            { width: 2 }, {},
            {}, {}, {},
          ]}
        />
      </div>

      <h1>Disabled Grid Items</h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <FocusGrid
          columnConfig={[{ width: '1fr' }, { width: '1fr' }, { width: '1fr' }, { width: '1fr' }]}
          rowConfig={[{ height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }]}
          isFocused={false}
          items={[
            {}, { width: 2 }, { shouldDisable: true },
            { width: 2, shouldDisable: true }, {}, {},
            { shouldDisable: true }, {}, { shouldDisable: true }, {},
          ]}
        />
      </div>

      <h1>Inter-Grid Focus</h1>
      <h2>Try navigating between the two grids below!</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <FocusGrid
          columnConfig={[{ width: '1fr' }, { width: '1fr' }]}
          rowConfig={[{ height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }]}
          isFocused={focusIndex === 3}
          items={[
            {}, {},
            {}, {},
            {}, {},
            {}, {},
          ]}
          onRightExit={() => setFocusIndex(4)}
        />

        <FocusGrid
          columnConfig={[{ width: '1fr' }, { width: '1fr' }]}
          rowConfig={[{ height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }]}
          isFocused={focusIndex === 4}
          items={[
            {}, {},
            {}, {},
            {}, {},
            {}, {},
          ]}
          onLeftExit={() => setFocusIndex(3)}
        />
      </div>

      <h1>Let's put it all together!</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <FocusGrid
          columnConfig={[{ width: '1fr' }, { width: '1fr' }]}
          rowConfig={[{ height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }]}
          isFocused={focusIndex === 5}
          items={[
            { width: 2 },
            {}, {},
            {}, { shouldDisable: true },
            {}, {},
          ]}
          onRightExit={() => setFocusIndex(6)}
        />

        <FocusGrid
          columnConfig={[{ width: '1fr' }, { width: '1fr' }]}
          rowConfig={[{ height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }, { height: 'minmax(150px, auto)' }]}
          isFocused={focusIndex === 6}
          items={[
            {}, {},
            {}, {},
            { width: 2, shouldDisable: true },
            {}, {},
          ]}
          onLeftExit={() => setFocusIndex(5)}
        />
      </div>
    </Fragment>
  );
}

export default App;
