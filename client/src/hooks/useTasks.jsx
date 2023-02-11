import React, { createContext, useState, useContext, useMemo } from 'react';
import tasksData from '../data/tasks.json';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(tasksData);

  const all = tasks.length;
  const complete = tasks.filter((task) => task.done).length;
  const incomplete = all - complete;

  const results = {
    all,
    complete,
    incomplete,
  };

  const data = useMemo(() => ({ tasks, setTasks, results }), [tasks, results]);

  return <TaskContext.Provider value={data}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
