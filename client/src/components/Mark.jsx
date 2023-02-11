import './Mark.css';

const Mark = (props) => {
  const { item, updateStatus } = props;
  return (
    <div
      className={item.done ? 'box done' : 'box'}
      onClick={() => updateStatus(item)}
    />
  );
};

export default Mark;
