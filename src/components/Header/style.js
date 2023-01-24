import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const InputContainer = styled.div`
    width: 670px;
    height: 42px;
    background: none;
    border: 1px solid ${({ theme }) => theme.title};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 25px;
    
  input {
    width: 95%;
    height: 100%;
    background: none;
    outline: none;
    border: none;
    color: ${({ theme }) => theme.title};
  }

  svg {
    color: ${({ theme }) => theme.title};
  }
`;

export const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 3rem;

  select {
    width: 100px;
    height: 25px;
    background: none;
    color: ${({ theme }) => theme.title};
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.title};
  }

  > input {
    width: 90px;
    height: 40px;
    border-radius: 5px;
    background: none;
    color: ${({ theme }) => theme.title};
    border: 1px solid ${({ theme }) => theme.title};
    outline: none;
    padding: 10px;
  }

  button {
    width: 90px;
    height: 85px;
    border: 1px solid ${({ theme }) => theme.yellow};
    border-radius: 5px;
    color: ${({ theme }) => theme.yellow};
    background: none;
    text-transform: uppercase;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    label {
      width: 120px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    
      input {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
