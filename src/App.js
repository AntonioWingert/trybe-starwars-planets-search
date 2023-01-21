import React from 'react';
import Filters from './components/Filters';
import Header from './components/Header';
import TableComponent from './components/TableComponent';

function App() {
  return (
    <div>
      <Header />
      <Filters />
      <TableComponent />
    </div>
  );
}

export default App;
