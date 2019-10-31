import React, { Fragment, useState } from 'react';

import './App.css';
import { FocusGrid } from './components/FocusGrid';

const App: React.FC = () => {
  const [ focusIndex, setFocusIndex ] = useState(0);

  return (
    <Fragment>
      <h1>Standard 4x4 Grid</h1>
      <FocusGrid
        columnConfig={[{ width: '1fr' }, { width: '1fr' }, { width: '1fr' }, { width: '1fr' }]}
        rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
        isFocused={focusIndex === 0}
        items={[
          {}, {}, {}, {},
          {}, {}, {}, {},
          {}, {}, {}, {},
          {}, {}, {}, {},
        ]}
        onDownExit={() => setFocusIndex(1)}
      />

      <h1>Variable-Width Layout Grid</h1>
      <FocusGrid
        columnConfig={[{ width: '1fr' }, { width: '1fr' }, { width: '1fr' }]}
        rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
        isFocused={focusIndex === 1}
        items={[
          {}, { width: 2 },
          { width: 2 }, {},
          {}, {}, {},
        ]}
        onDownExit={() => setFocusIndex(2)}
        onTopExit={() => setFocusIndex(0)}
      />

      <h1>Disabled Grid Items</h1>
      <FocusGrid
        columnConfig={[{ width: '1fr' }, { width: '1fr' }, { width: '1fr' }, { width: '1fr' }]}
        rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
        isFocused={focusIndex === 2}
        items={[
          {}, { width: 2 }, { shouldDisable: true },
          { width: 2, shouldDisable: true }, {}, {},
          { shouldDisable: true }, {}, { shouldDisable: true }, {},
        ]}
        onDownExit={() => setFocusIndex(3)}
        onTopExit={() => setFocusIndex(1)}
      />

      <h1>Inter-Grid Focus</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <FocusGrid
          columnConfig={[{ width: '1fr' }, { width: '1fr' }]}
          rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
          isFocused={focusIndex === 3}
          items={[
            {}, {},
            {}, {},
            {}, {},
            {}, {},
          ]}
          onDownExit={() => setFocusIndex(5)}
          onRightExit={() => setFocusIndex(4)}
          onTopExit={() => setFocusIndex(2)}
        />

        <FocusGrid
          columnConfig={[{ width: '1fr' }, { width: '1fr' }]}
          rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
          isFocused={focusIndex === 4}
          items={[
            {}, {},
            {}, {},
            {}, {},
            {}, {},
          ]}
          onDownExit={() => setFocusIndex(6)}
          onLeftExit={() => setFocusIndex(3)}
          onTopExit={() => setFocusIndex(2)}
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
          rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
          isFocused={focusIndex === 5}
          items={[
            { width: 2 },
            {}, {},
            {}, { shouldDisable: true },
            {}, {},
          ]}
          onRightExit={() => setFocusIndex(6)}
          onTopExit={() => setFocusIndex(3)}
        />

        <FocusGrid
          columnConfig={[{ width: '1fr' }, { width: '1fr' }]}
          rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
          isFocused={focusIndex === 6}
          items={[
            {}, {},
            {}, {},
            { width: 2, shouldDisable: true },
            {}, {},
          ]}
          onLeftExit={() => setFocusIndex(5)}
          onTopExit={() => setFocusIndex(4)}
        />
      </div>
    </Fragment>
  );
}

export default App;
