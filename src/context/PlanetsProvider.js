/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import useFetch from '../hooks/useFetch';

export const PlanetsContext = createContext({});

function PlanetsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filterByText, setFilterByText] = useState('');

  const { errors, isLoading, makeFetch } = useFetch('https://swapi.dev/api/planets');

  useEffect(() => {
    const realizeFetch = async () => {
      const data = await makeFetch();
      setPlanetsList(data.results);
      return setPlanets(data.results);
    };
    realizeFetch();
  }, []);

  const setPlanetsFilterForText = (text) => {
    setFilterByText(text);
  };

  const filterPlanetsText = () => {
    if (!filterByText) return setPlanets(planetsList);
    const filteredPlanets = planets
      .filter((planet) => planet.name.includes(filterByText.toLowerCase()));
    setPlanets(filteredPlanets);
  };

  useEffect(() => {
    filterPlanetsText();
  }, [filterByText]);

  const values = {
    planets, errors, isLoading, setPlanetsFilterForText, planetsList,
  };

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
