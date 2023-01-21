/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import useFetch from '../hooks/useFetch';

export const PlanetsContext = createContext({});

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsQuery, setPlanetsQuery] = useState([]);
  const [resetFilters, setResetFilters] = useState(false);
  const [inputsFilters, setInputsFilters] = useState({
    population: '',
    orbital_period: '',
    diameter: '',
    rotation_period: '',
    surface_water: '',
  });

  const { makeFetch } = useFetch('https://swapi.dev/api/planets');

  useEffect(() => {
    const realizeFetch = async () => {
      const data = await makeFetch();
      setPlanetsQuery(data.results);
      setPlanets(data.results);
    };
    realizeFetch();
  }, []);

  const filteredByName = (name) => {
    const filteredPlanets = planets
      .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));
    setPlanetsQuery(filteredPlanets);
  };

  const filteredByInputs = (column, operator, populationNumber) => {
    const filteredByQuery = planetsQuery.filter((planet) => {
      if (operator === 'maior que') {
        return +planet[column] > +populationNumber;
      }
      if (operator === 'menor que') {
        return +planet[column] < +populationNumber;
      }
      return planet[column] === populationNumber;
    });
    setInputsFilters((state) => ({
      ...state,
      [column]: `${column} ${operator} ${populationNumber}`,
    }));
    setPlanetsQuery(filteredByQuery);
  };

  const removeInputsFilters = (column, operator, populationNumber) => {
    const filteredByQuery = planets.filter((planet) => {
      if (operator === 'maior que') {
        return +planet[column] > +populationNumber;
      }
      if (operator === 'menor que') {
        return +planet[column] <= +populationNumber;
      }
      return planet[column] === populationNumber;
    });
    setInputsFilters({
      ...inputsFilters,
      [column]: `${column} ${operator} ${populationNumber}`,
    });
    setPlanetsQuery(filteredByQuery);
  };

  const filterCheck = () => {
    const {
      population,
      orbital_period: orbitalPeriod,
      diameter,
      rotation_period: rotationPeriod,
      surface_water: surfaceWater,
    } = inputsFilters;
    const filters = [
      population,
      orbitalPeriod,
      diameter,
      rotationPeriod,
      surfaceWater,
    ];
    const activeFilters = filters.filter((filter) => filter !== '');
    if (activeFilters.length === 0 && resetFilters) {
      setPlanetsQuery(planets);
      setResetFilters(false);
    } else if (activeFilters.length > 0 && resetFilters) {
      activeFilters.forEach((filter) => {
        const [column, operationA, operationB, populationNumber] = filter.split(' ');
        const operation = `${operationA} ${operationB}`;
        removeInputsFilters(column, operation, populationNumber);
      });
      setResetFilters(false);
    }
    setResetFilters(false);
  };

  useEffect(() => {
    filterCheck();
  }, [resetFilters]);

  const removeFilter = (filter) => {
    const column = filter.split(' ')[0];
    setInputsFilters({ ...inputsFilters, [column]: '' }, setResetFilters(true));
  };

  const resetAllFilters = () => {
    setPlanetsQuery(planets);
    setInputsFilters({
      population: '',
      orbital_period: '',
      diameter: '',
      rotation_period: '',
      surface_water: '',
    });
  };

  const planetsSort = (column, sort) => {
    const knownPlanets = planetsQuery.filter((planet) => planet[column] !== 'unknown');
    const unknownPlanets = planetsQuery.filter((planet) => planet[column] === 'unknown');
    const sortPlanets = knownPlanets.sort((a, b) => {
      if (sort === 'ASC') {
        return +a[column] - +b[column];
      }
      return +b[column] - +a[column];
    });
    const sortedPlanets = [...sortPlanets, ...unknownPlanets];
    setPlanetsQuery(sortedPlanets);
  };

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        planetsQuery,
        inputsFilters,
        filteredByName,
        filteredByInputs,
        removeFilter,
        resetAllFilters,
        planetsSort,
      } }
    >
      {children}

    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
