import React from 'react';
import Filters from './components/Filters';
import Header from './components/Header';
import TableComponent from './components/TableComponent';
import LogoContainer from './styles/LogoContainer';
import FilterContainer from './styles/FilterContainer';

function App() {
  return (
    <>
      <LogoContainer />
      <FilterContainer>
        <Header />
        <Filters />
        <TableComponent />
      </FilterContainer>
    </>
  );
}

export default App;
