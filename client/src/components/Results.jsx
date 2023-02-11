import styled from 'styled-components';

const ResultsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Results = (props) => {
  const { results } = props;

  return (
    <>
      <hr />
      <ResultsContainer>
        <span>
          <strong>Total:</strong> {results.all}
        </span>
        <span>
          <strong>Complete:</strong> {results.complete}
        </span>
        <span>
          <strong>Incomplete:</strong> {results.incomplete}
        </span>
      </ResultsContainer>
    </>
  );
};

export default Results;
