import React, { createContext, useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import useFetch from '../hooks/useFetch';

export const PlanetsContext = createContext({});

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const { errors, isLoading, makeFetch } = useFetch('https://swapi.dev/api/planets');

  useEffect(() => {
    const realizeFetch = async () => {
      const data = await makeFetch();
      return setPlanets(data.results);
    };
    realizeFetch();
  }, []);

  const values = {
    planets, errors, isLoading };

  return (
    <PlanetsContext.Provider
      value={ values }
    >
      {children}

    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export function usePlanets() {
  const context = useContext(PlanetsContext);
  return context;
}

export default PlanetsProvider;
