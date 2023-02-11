import './Item.css';

const Item = (props) => {
  const { item } = props;
  return <span className={item.done ? 'done' : ''}>{item.title}</span>;
};

export default Item;
