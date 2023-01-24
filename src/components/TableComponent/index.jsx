import { useContext } from 'react';
import { PlanetsContext } from '../../context/PlanetsProvider';
import { TableContainer } from './style';

const MAX_OBJ = 7;

function TableComponent() {
  const { planetsQuery, isLoading } = useContext(PlanetsContext);

  if (isLoading) return 'Carregando';

  return (
    <TableContainer>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
        </tr>
      </thead>
      <tbody>
        {planetsQuery.map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films.map((film) => <p key={ film }>{film}</p>)}</td>
          </tr>
        )).slice(0, MAX_OBJ)}
      </tbody>
    </TableContainer>
  );
}

export default TableComponent;
