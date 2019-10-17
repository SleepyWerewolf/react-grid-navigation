import React, { Fragment } from 'react';
import './App.css';
import { FocusContainer } from './components/NavigationFocus/FocusContainer';

const App: React.FC = () => {
  return (
    <Fragment>
      <h1>Standard 4x4 Grid</h1>
      <FocusContainer
        columnConfig={[{ width: '1fr' }, { width: '1fr' }, { width: '1fr' }, { width: '1fr' }]}
        rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
        items={[
          {}, {}, {}, {},
          {}, {}, {}, {},
          {}, {}, {}, {},
          {}, {}, {}, {},
        ]}
      />

      <h1>Variable-Layout Grid</h1>
      <FocusContainer
        columnConfig={[{ width: '1fr' }, { width: '1fr' }, { width: '1fr' }]}
        rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
        items={[
          {}, { width: 2 },
          { width: 2 }, {},
          {}, {}, {},
        ]}
      />

      <h1>Disabled Grid Items</h1>
      <FocusContainer
        columnConfig={[{ width: '1fr' }, { width: '1fr' }, { width: '1fr' }, { width: '1fr' }]}
        rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
        items={[
          {}, { width: 2 }, {},
          { width: 2, shouldDisable: true }, {}, {},
          { shouldDisable: true }, {}, { shouldDisable: true }, {},
        ]}
      />
      <h1>Switch between grids</h1>

      <h1>Let's put it all together!</h1>
    </Fragment>
  );
}

export default App;
