import styled from 'styled-components';

const ResultsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Results = ({ tasks }) => {
  const all = tasks.length;
  const complete = tasks.filter((task) => task.done).length;
  const incomplete = all - complete;

  return (
    <ResultsContainer>
      <span>
        <strong>Total:</strong> {all}
      </span>
      <span>
        <strong>Complete:</strong> {complete}
      </span>
      <span>
        <strong>Incomplete:</strong> {incomplete}
      </span>
    </ResultsContainer>
  );
};

export default Results;
