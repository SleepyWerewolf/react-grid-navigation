import React, { Fragment, useState } from 'react';
import './App.css';
import { FocusContainer } from './components/NavigationFocus/FocusContainer';

const App: React.FC = () => {
  const [ focusIndex, setFocusIndex ] = useState(0);

  return (
    <Fragment>
      <h1>Standard 4x4 Grid</h1>
      <FocusContainer
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

      <h1>Variable-Layout Grid</h1>
      <FocusContainer
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
      <FocusContainer
        columnConfig={[{ width: '1fr' }, { width: '1fr' }, { width: '1fr' }, { width: '1fr' }]}
        rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
        isFocused={focusIndex === 2}
        items={[
          {}, { width: 2 }, { shouldDisable: true },
          { width: 2, shouldDisable: true }, {}, {},
          { shouldDisable: true }, {}, { shouldDisable: true }, {},
        ]}
      />
      <h1>Inter-Grid Focus</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <FocusContainer
          columnConfig={[{ width: '1fr' }, { width: '1fr' }]}
          rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
          isFocused={focusIndex === 3}
          items={[
            {}, {},
            {}, {},
            {}, {},
            {}, {},
          ]}
          onRightExit={() => setFocusIndex(4)}
        />

        <FocusContainer
          columnConfig={[{ width: '1fr' }, { width: '1fr' }]}
          rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
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
    </Fragment>
  );
}

export default App;
