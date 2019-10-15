import React from 'react';
import './App.css';
import { FocusContainer } from './components/NavigationFocus/FocusContainer';

const App: React.FC = () => {
  return (
    <FocusContainer
      columnConfig={[{ width: '1fr' }, { width: '1fr' }, { width: '1fr' }]}
      rowConfig={[{ height: 'minmax(250px, auto)' }, { height: 'minmax(250px, auto)' }]}
      // gridTemplateColumns = 'repeat(4 1fr)'
      // gridTemplateRows = 'repeat(2, minmax(250px, auto))'
      items = {[
        {}, { width: 2 },
        {}, {}, {},
      ]}
    />
  );
}

export default App;
