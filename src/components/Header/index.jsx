import React from 'react';
import { usePlanets } from '../../context/PlanetsProvider';

function Header() {
  const { setPlanetsFilterForText } = usePlanets();

  return (
    <header>
      <input
        type="text"
        placeholder="Pesquise um planeta"
        data-testid="name-filter"
        onChange={ ({ target: { value } }) => setPlanetsFilterForText(value) }
      />
    </header>
  );
}

export default Header;
