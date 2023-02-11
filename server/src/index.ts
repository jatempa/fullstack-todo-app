import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import { v4 as uuidv4 } from 'uuid';

const typeDefs = gql`
  type Task {
    id: ID!
    title: String
    done: Boolean
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    addTask(title: String!): Task
    updateTask(id: ID!): Task
  }
`;

const tasks = [
  {
    id: 'ef7b0734-911b-46bd-86f9-11cfe3610ced',
    title: 'libero tenetur blanditiis',
    done: false,
  },
  {
    id: '06b66e47-c5ca-42c4-a3dc-18f8c8210f69',
    title: 'ratione quo quaerat',
    done: false,
  },
  {
    id: 'e52d8c54-31a8-455e-8871-b2364f73d6c1',
    title: 'aut eum molestias',
    done: false,
  },
  {
    id: 'c14d162a-cb6e-49d9-b4ba-d1135211dcfe',
    title: 'autem repellat omnis',
    done: false,
  },
  {
    id: '61487c4e-990c-4b8b-bef8-87f5ca9c2bcf',
    title: 'ut voluptatem voluptatum',
    done: false,
  },
  {
    id: 'd56192e3-57d2-432e-8f65-7c517b91f466',
    title: 'velit quod maiores',
    done: false,
  },
  {
    id: 'd7fd0104-89bd-4746-8457-3ab9068e2f9a',
    title: 'et dolorem necessitatibus',
    done: false,
  },
];

const resolvers = {
  Query: {
    tasks: () => tasks,
  },
  Mutation: {
    addTask: (_, { title }) => {
      if (!title || title.length === 0) return;

      const newTask = {
        id: uuidv4(),
        title,
        done: false,
      };

      tasks.push(newTask);

      return newTask;
    },
    updateTask: (_, { id }) => {
      const index = tasks.findIndex((task) => task.id === id);
      tasks[index] = {
        ...tasks[index],
        done: !tasks[index].done,
      };
      return tasks[index];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
