import React from 'react';
import './App.css';
import { FocusContainer } from './components/NavigationFocus/FocusContainer';

const App: React.FC = () => {
  return (
    <FocusContainer
      items={[
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
      ]}
    />
  );
}

export default App;
