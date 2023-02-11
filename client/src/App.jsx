import Card from './components/Card';
import CustomTaskInput from './components/CustomTaskInput';
import Header from './components/Header';
import ItemList from './components/ItemList';
import Results from './components/Results';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_TASKS = gql`
  query GetAllTasks {
    tasks {
      id
      title
      done
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_ALL_TASKS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  return (
    <Card id='app' className='card'>
      <Header>To Do</Header>
      <CustomTaskInput />
      {data.tasks.length > 0 ? (
        <>
          <ItemList tasks={data.tasks} />
          <hr />
          <Results tasks={data.tasks} />
        </>
      ) : null}
    </Card>
  );
}

export default App;
