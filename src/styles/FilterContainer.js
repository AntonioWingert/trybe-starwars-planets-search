import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  bottom: 197px;
  width: 1212px;
  height: 750px;
  border: 1px solid ${({ theme }) => theme.title};
  border-radius: 20px;
`;

export default FilterContainer;
