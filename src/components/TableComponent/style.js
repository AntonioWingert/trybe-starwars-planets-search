import styled from 'styled-components';

export const TableContainer = styled.table`
  thead {
   width: 100%;
   height: 100%;

   tr {
    th {
      text-align: center;
      border: 1px solid #000000;
      background: #2E3035;
      height: 70px;
      color: ${({ theme }) => theme.title};
      font-weight: 700;
    }
   }
  }

  tbody {
    width: 100%;
    height: 100%;

    tr {
      
      td{
        height: 50px;
        border-bottom: 1px solid ${({ theme }) => theme.primary};
        text-align: center;
      }
    }
  }
`;
