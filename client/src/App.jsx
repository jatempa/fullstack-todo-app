import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
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
  const [task, setTask] = useState('');
  const { loading, error, data } = useQuery(GET_ALL_TASKS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  const addTask = (event) => {
    if (event.key === 'Enter') {
      if (!task || task.length === 0) return;

      const newTask = {
        id: uuidv4(),
        title: task,
        done: false,
      };

      setTask('');
    }
  };

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const updateStatus = (selectedTask) => {
    const index = tasks.findIndex((task) => task.id === selectedTask.id);
    tasks[index] = {
      ...tasks[index],
      done: !tasks[index].done,
    };

    setTasks([...tasks]);
  };

  return (
    <Card id='app' className='card'>
      <Header>To Do</Header>
      <CustomTaskInput
        task={task}
        addTask={addTask}
        handleChange={handleChange}
      />
      {data.tasks.length > 0 ? (
        <>
          <ItemList items={data.tasks} updateStatus={updateStatus} />
          <hr />
          <Results tasks={data.tasks} />
        </>
      ) : null}
    </Card>
  );
}

export default App;
