import React, { useContext, useState } from 'react';
import { PlanetsContext } from '../../context/PlanetsProvider';

function Header() {
  const [filters, setFilters] = useState({
    column: 'population',
    operation: 'maior que',
    populationNumber: 0,
    sortColumn: 'population',
    sort: '',
  });

  const {
    inputsFilters: {
      population,
      diameter, rotation_period:
      rotationPeriod,
      orbital_period: orbitalPeriod,
      surface_water: surfaceWater,
    },
    filteredByName,
    filteredByInputs,
    resetAllFilters,
    planetsSort,
  } = useContext(PlanetsContext);

  const handleChange = ({ target: { name, value } }) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { column, operation, populationNumber } = filters;
    filteredByInputs(column, operation, populationNumber);
    setFilters({ column: 'population', operation, populationNumber });
  };

  const handleClick = () => {
    const { sortColumn, sort } = filters;
    planetsSort(sortColumn, sort);
  };

  const { column, operation, populationNumber, sortColumn } = filters;

  return (
    <main>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => filteredByName(target.value) }
        placeholder="Digite o nome de um planeta"
      />

      <form>
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleChange }
          value={ column }
        >
          { !population && <option value="population">population</option> }
          { !orbitalPeriod && <option value="orbital_period">orbital_period</option> }
          { !diameter && <option value="diameter">diameter</option> }
          { !rotationPeriod && <option value="rotation_period">rotation_period</option> }
          { !surfaceWater && <option value="surface_water">surface_water</option> }
        </select>
        <select
          data-testid="comparison-filter"
          name="operation"
          onChange={ handleChange }
          value={ operation }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          min="0"
          value={ populationNumber }
          name="populationNumber"
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="button-filter"
          onClick={ handleSubmit }
        >
          Filtrar
        </button>
        <select
          data-testid="column-sort"
          name="sortColumn"
          value={ sortColumn }
          onChange={ handleChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <div>
          <label htmlFor="column-sort-input-asc">
            <input
              type="radio"
              name="sort"
              data-testid="column-sort-input-asc"
              value="ASC"
              onChange={ handleChange }
            />
            Ascendente
          </label>
          <label htmlFor="column-sort-input-desc">
            <input
              type="radio"
              name="sort"
              data-testid="column-sort-input-desc"
              value="DESC"
              onChange={ handleChange }
            />
            Descendente
          </label>
        </div>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ handleClick }
        >
          Ordenar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ resetAllFilters }
        >
          Remover todos os filtros ativos
        </button>
      </form>
    </main>
  );
}

export default Header;
