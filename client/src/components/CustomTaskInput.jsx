import './CustomTaskInput.css';

const CustomTaskInput = (props) => {
  const { task, addTask, handleChange } = props;

  return (
    <input
      value={task}
      onChange={handleChange}
      onKeyUp={addTask}
      placeholder='Enter your task ...'
    />
  );
};

export default CustomTaskInput;
