import styled from 'styled-components';
import Item from './Item';
import Mark from './Mark';
import { useMutation, gql } from '@apollo/client';

const ItemContainer = styled.ul`
  padding: 0px;

  & li {
    padding: 0px;
    text-align: left;
    list-style-position: inside;
    list-style-type: decimal;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!) {
    updateTask(id: $id) {
      id
      title
      done
    }
  }
`;

const ItemList = ({ tasks }) => {
  const [updateTask] = useMutation(UPDATE_TASK);

  const updateStatus = (selectedTask) =>
    updateTask({ variables: { id: selectedTask.id } });

  return (
    <ItemContainer>
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <Item item={task} />
            <Mark item={task} updateStatus={updateStatus} />
          </li>
        );
      })}
    </ItemContainer>
  );
};

export default ItemList;
