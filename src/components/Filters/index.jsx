import React, { useContext } from 'react';
import { PlanetsContext } from '../../context/PlanetsProvider';

function Filters() {
  const { inputsFilters, removeFilter } = useContext(PlanetsContext);
  const {
    population,
    orbital_period: orbitalPeriod,
    diameter,
    rotation_period: rotationPeriod,
    surface_water: surfaceWater,
  } = inputsFilters;
  return (
    <main>
      {diameter && (
        <div data-testid="filter">
          <p>{diameter}</p>
          <button
            type="button"
            onClick={ () => removeFilter(diameter) }
            data-testid="remove-button"
          >
            remover

          </button>
        </div>
      )}
      {population && (
        <div data-testid="filter">
          <p>{population}</p>
          <button
            type="button"
            onClick={ () => removeFilter(population) }
            data-testid="remove-button"
          >
            remover

          </button>
        </div>
      )}
      {rotationPeriod && (
        <div data-testid="filter">
          <p>{rotationPeriod}</p>
          <button
            type="button"
            onClick={ () => removeFilter(rotationPeriod) }
            data-testid="remove-button"
          >
            remover

          </button>
        </div>
      )}
      {surfaceWater && (
        <div data-testid="filter">
          <p>{surfaceWater}</p>
          <button
            type="button"
            onClick={ () => removeFilter(surfaceWater) }
            data-testid="remove-button"
          >
            remover

          </button>
        </div>
      )}
      {orbitalPeriod && (
        <div data-testid="filter">
          <p>{orbitalPeriod}</p>
          <button
            type="button"
            onClick={ () => removeFilter(orbitalPeriod) }
            data-testid="remove-button"
          >
            remover

          </button>
        </div>
      )}
    </main>
  );
}

export default Filters;
