import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';
import PlanetsProvider from '../context/PlanetsProvider';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';

const mockResponse = {
  results: [
    {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      films: [
        'https://swapi-trybe.herokuapp.com/api/films/1/',
        'https://swapi-trybe.herokuapp.com/api/films/3/',
        'https://swapi-trybe.herokuapp.com/api/films/4/',
        'https://swapi-trybe.herokuapp.com/api/films/5/',
        'https://swapi-trybe.herokuapp.com/api/films/6/',
      ],
      created: '2014-12-09T13:50:49.641000Z',
      edited: '2014-12-20T20:58:18.411000Z',
      url: 'https://swapi-trybe.herokuapp.com/api/planets/1/',
    },
    {
      name: 'Alderaan',
      rotation_period: '24',
      orbital_period: '364',
      diameter: '12500',
      climate: 'temperate',
      gravity: '1 standard',
      terrain: 'grasslands, mountains',
      surface_water: '40',
      population: '2000000000',
      films: [
        'https://swapi-trybe.herokuapp.com/api/films/1/',
        'https://swapi-trybe.herokuapp.com/api/films/2/',
        'https://swapi-trybe.herokuapp.com/api/films/3/',
        'https://swapi-trybe.herokuapp.com/api/films/6/',
      ],
      created: '2014-12-10T11:35:48.479000Z',
      edited: '2014-12-20T20:58:18.420000Z',
      url: 'https://swapi-trybe.herokuapp.com/api/planets/2/',
    },
  ],
};

const spyFetch = jest.spyOn(global, "fetch");

describe('application test', () => {
  beforeEach(async () => {
    spyFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });
    await act(async () => render (
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    ));
  })
  it('should render app component and find the title', async () => {
    const title = screen.getByRole('heading', {name: /star wars/i});
    expect(title).toBeInTheDocument();
  });
  it('should render app component and find the thirteen columns', async () => {
    const columns = screen.getAllByRole('columnheader');
    expect(columns).toHaveLength(13);
  });
  it('should render app component and find the ordination button', async () => {
    const filterButton = screen.getByRole('button', { name: /ordenar/i });
    expect(filterButton).toBeInTheDocument();
  });
  it('should render app component and find the remove filter button', async () => {
    const filterButton = screen.getByRole('button', { name: /Remover todos os filtros ativos/i });
    expect(filterButton).toBeInTheDocument();
  });
  it('should render app component and verify if fetch is to have called', async () => {
    expect(spyFetch).toHaveBeenCalled();
  });
  it('should render app component and verify if fetch is to have called with a correct url', async () => {
    expect(spyFetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  });
  it('should the planets in the screen', async () => {
    const planet = screen.getByText(/Tatooine/i);
    const planet2 = screen.getByText(/Alderaan/i);
    expect(planet).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();
  });
  it('should the filters in the screen', async () => {
    const filterButton = screen.getByTestId('button-filter')
    const filterColumn = screen.getByTestId('column-filter')
    const filterComparison = screen.getByTestId('comparison-filter')
    const filterNumber = screen.getByTestId('value-filter')

    expect(filterButton).toBeInTheDocument();
    expect(filterColumn).toBeInTheDocument();
    expect(filterComparison).toBeInTheDocument();
    expect(filterNumber).toBeInTheDocument();
  });
  it('should the filter "maior que" is work correctly', async () => {
    const filterButton = screen.getByTestId('button-filter')
    const filterColumn = screen.getByTestId('column-filter')
    const filterComparison = screen.getByTestId('comparison-filter')
    const filterNumber = screen.getByTestId('value-filter')

    const planet = screen.getByText(/Tatooine/i);
    const planet2 = screen.queryByText(/Alderaan/i);

    expect(planet).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();

    userEvent.selectOptions(filterColumn, 'surface_water')
    userEvent.selectOptions(filterComparison, 'maior que')
    userEvent.type(filterNumber, '10')
    userEvent.click(filterButton)

    expect(planet).not.toBeInTheDocument();
    expect(planet2).toBeInTheDocument();
  });
  it('should the filter "menor que" is work correctly', async () => {
    const filterButton = screen.getByTestId('button-filter')
    const filterColumn = screen.getByTestId('column-filter')
    const filterComparison = screen.getByTestId('comparison-filter')
    const filterNumber = screen.getByTestId('value-filter')

    const planet = screen.getByText(/Tatooine/i);
    const planet2 = screen.queryByText(/Alderaan/i);

    expect(planet).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();

    userEvent.selectOptions(filterColumn, 'surface_water')
    userEvent.selectOptions(filterComparison, 'menor que')
    userEvent.type(filterNumber, '10')
    userEvent.click(filterButton)

    expect(planet).toBeInTheDocument();
    expect(planet2).not.toBeInTheDocument();
  });
  it('should the filter is render in the page with the delete button', async () => {
    const filterButton = screen.getByTestId('button-filter')
    const filterColumn = screen.getByTestId('column-filter')
    const filterComparison = screen.getByTestId('comparison-filter')
    const filterNumber = screen.getByTestId('value-filter')

    const planet = screen.getByText(/Tatooine/i);
    const planet2 = screen.queryByText(/Alderaan/i);

    expect(planet).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();

    userEvent.selectOptions(filterColumn, 'surface_water')
    userEvent.selectOptions(filterComparison, 'menor que')
    userEvent.type(filterNumber, '10')
    userEvent.click(filterButton)

    expect(planet).toBeInTheDocument();
    expect(planet2).not.toBeInTheDocument();

    const filter = await screen.findByTestId('filter')
    const removeButton = filter.children[1]

    await waitFor(() => {
      expect(filter).toBeInTheDocument()
      expect(removeButton).toBeInTheDocument()
    })

    await waitFor(() => {
      userEvent.click(removeButton)
    })

    await wait (() => {
      expect(filter).not.toBeInTheDocument()
      expect(removeButton).not.toBeInTheDocument()
      expect(planet).toBeInTheDocument();
      expect(planet2).toBeInTheDocument();
    });
  });
  it('should type the name of planet, render correctly', async () => {
    const filterInput = screen.getByTestId('name-filter')
    const planet = screen.getByText(/Tatooine/i);
    const planet2 = screen.queryByText(/Alderaan/i);

    expect(planet).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();

    userEvent.type(filterInput, 'Tatooine')

    expect(planet).toBeInTheDocument();
    expect(planet2).not.toBeInTheDocument();

    userEvent.clear(filterInput)

    await wait(() => {
      expect(planet).toBeInTheDocument();
      expect(planet2).toBeInTheDocument();
    })
  });
  it('should the planets ordinate correctly', async () => {
    const orderInput = screen.getByTestId('column-sort')
    const descRadio = screen.getByTestId('column-sort-input-desc')
    const orderBtn = screen.getByTestId('column-sort-button')
    const planets = screen.getAllByTestId('planet-name')

    expect(planets[0]).toHaveTextContent('Tatooine')
    expect(planets[1]).toHaveTextContent('Alderaan')

    userEvent.selectOptions(orderInput, 'orbital_period')
    userEvent.click(descRadio)
    userEvent.click(orderBtn)

    await act( async() => {
      const planets2 = screen.getAllByTestId('planet-name')
      expect(planets2[0]).toHaveTextContent('Alderaan')
      expect(planets2[1]).toHaveTextContent('Tatooine')
    })
  });
  it('should the select button works correctly', async () => {
    const filterButton = screen.getByTestId('button-filter')
    const filterColumn = screen.getByTestId('column-filter')
    const filterComparison = screen.getByTestId('comparison-filter')
    const filterNumber = screen.getByTestId('value-filter')

    expect(filterColumn).toHaveLength(5)

    userEvent.selectOptions(filterColumn, 'surface_water')
    userEvent.selectOptions(filterComparison, 'menor que')
    userEvent.type(filterNumber, '10')
    userEvent.click(filterButton)

    expect(filterColumn).toHaveLength(4)

    userEvent.selectOptions(filterColumn, 'population')
    userEvent.selectOptions(filterComparison, 'maior que')
    userEvent.type(filterNumber, '100000')
    userEvent.click(filterButton)

    expect(filterColumn).toHaveLength(3)

    userEvent.selectOptions(filterColumn, 'orbital_period')
    userEvent.selectOptions(filterComparison, 'menor que')
    userEvent.type(filterNumber, '200')
    userEvent.click(filterButton)

    expect(filterColumn).toHaveLength(2)

    userEvent.selectOptions(filterColumn, 'diameter')
    userEvent.selectOptions(filterComparison, 'maior que')
    userEvent.type(filterNumber, '8000')
    userEvent.click(filterButton)

    expect(filterColumn).toHaveLength(1)

    userEvent.selectOptions(filterColumn, 'rotation_period')
    userEvent.selectOptions(filterComparison, 'menor que')
    userEvent.type(filterNumber, '30')
    userEvent.click(filterButton)

    expect(filterColumn).toHaveLength(0)

    const removeButton = await screen.findAllByTestId('remove-button')
    expect(removeButton).toHaveLength(5)

    await waitFor(() => {
      userEvent.click(removeButton[0])
      expect(filterColumn).toHaveLength(1)
      userEvent.click(removeButton[1])
      expect(filterColumn).toHaveLength(2)
      userEvent.click(removeButton[2])
      expect(filterColumn).toHaveLength(3)
      userEvent.click(removeButton[3])
      expect(filterColumn).toHaveLength(4)
      userEvent.click(removeButton[4])
      expect(filterColumn).toHaveLength(5)
    })
  });
  it('should have a state reset with use a reset function', async () => {
    const filterButton = screen.getByTestId('button-filter')
    const filterColumn = screen.getByTestId('column-filter')
    const filterComparison = screen.getByTestId('comparison-filter')
    const filterNumber = screen.getByTestId('value-filter')

    const planet = screen.getByText(/Tatooine/i);
    const planet2 = screen.queryByText(/Alderaan/i);

    expect(planet).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();

    userEvent.selectOptions(filterColumn, 'surface_water')
    userEvent.selectOptions(filterComparison, 'menor que')
    userEvent.type(filterNumber, '10')
    userEvent.click(filterButton)

    const filter = await screen.findByTestId('filter')
    const removeButton = filter.children[1]

    expect(planet).toBeInTheDocument();
    expect(planet2).not.toBeInTheDocument();

    await wait(async () => {
      expect(filter).toBeInTheDocument()
      expect(removeButton).toBeInTheDocument()

      userEvent.click(removeButton)

      expect(planet).toBeInTheDocument();
      expect(planet2).toBeInTheDocument();
    });
  })
})