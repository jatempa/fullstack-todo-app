import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const GET_ALL_TASKS = gql`
  query GetAllTasks {
    tasks {
      id
      title
      done
    }
  }
`;

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [results, setResults] = useState({
    all: 0,
    complete: 0,
    incomplete: 0,
  });

  useEffect(() => {
    client
      .query({
        query: GET_ALL_TASKS,
      })
      .then((t) => {
        setTasks(t.data.tasks);

        const all = tasks.length;
        const complete = tasks.filter((task) => task.done).length;
        const incomplete = all - complete;

        setResults({
          ...results,
          all,
          complete,
          incomplete,
        });
      });
  }, [tasks, results]);

  const values = useMemo(
    () => ({ tasks, setTasks, results }),
    [tasks, results]
  );

  return (
    <ApolloProvider client={client}>
      <TaskContext.Provider value={values}>{children}</TaskContext.Provider>
    </ApolloProvider>
  );
};

export default TaskProvider;
