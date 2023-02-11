import './CustomTaskInput.css';
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GET_ALL_TASKS } from '../App';

const ADD_TASK = gql`
  mutation AddTask($title: String!) {
    addTask(title: $title) {
      id
      title
      done
    }
  }
`;

const CustomTaskInput = () => {
  const [addTask] = useMutation(ADD_TASK, {
    refetchQueries: [{ query: GET_ALL_TASKS }, 'GetAllTasks'],
  });
  const [task, setTask] = useState('');

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const createTask = (event) => {
    if (event.key === 'Enter') {
      if (!task || task.length === 0) return;

      addTask({ variables: { title: task } });

      setTask('');
    }
  };

  return (
    <input
      value={task}
      onChange={handleChange}
      onKeyUp={createTask}
      placeholder='Enter your task ...'
    />
  );
};

export default CustomTaskInput;
