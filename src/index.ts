require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
import connection from "../typeorm.database";
import { Task } from "../taskModel";

connection()
  .then(() => {
    console.log("Database was connected.");
  })
  .catch((error) => {
    console.error("Database error:", error);
  });

const typeDefs = gql`
  type Task {
    id: ID
    title: String
    taskType: TaskType
    executor: User
    description: String
    important: Boolean
  }

  input TaskInput {
    title: String!
    taskTypeId: ID!
    executorId: ID!
    description: String!
    important: Boolean!
  }

  input TaskUpdateInput {
    title: String
    taskTypeId: Int
    executorId: Int
    description: String
    important: Boolean
  }

  type TaskType {
    id: ID
    name: String
  }

  type Query {
    tasks(name: String): [Task]
    task(id: ID!): Task
    taskTypes(name: String): [TaskType]
    users(name: String): [User]
  }

  type Mutation {
    addTask(input: TaskInput): Task
    updateTask(id: ID!, input: TaskUpdateInput): Task
  }

  type User {
    id: ID
    name: String
  }
`;

const taskTypes: { id: number; name: string }[] = [
  {
    id: 1,
    name: "Рабочая",
  },
  {
    id: 2,
    name: "Регулярная",
  },
];

const tasks: {
  id: number;
  title: string;
  taskTypeId: number;
  executorId: number;
  description: string;
  important: boolean;
}[] = [
  {
    id: 1,
    title: "Чето",
    taskTypeId: 1,
    executorId: 1,
    description: "Сделай чето",
    important: true,
  },
  {
    id: 2,
    title: "Еще чето",
    taskTypeId: 2,
    executorId: 2,
    description: "Сделай еще чето",
    important: true,
  },
];
const users: { id: number; name: string }[] = [
  {
    id: 1,
    name: "Ярик",
  },
  {
    id: 2,
    name: "не Ярик",
  },
];

const resolvers = {
  Query: {
    tasks: (_: any, { name }: { name: string }) =>
      name !== undefined && name !== ""
        ? tasks.filter((task) => task.title.search(name) !== -1)
        : tasks,
    task: (_: any, { id }: { id: string }) =>
      tasks.find((task) => task.id === Number(id)),
    taskTypes: (_: any, { name }: { name: string }) =>
      name !== undefined && name !== ""
        ? taskTypes.filter((taskType) => taskType.name.search(name) !== -1)
        : taskTypes,
    users: (_: any, { name }: any) =>
      name !== undefined && name !== ""
        ? users.filter((user) => user.name.search(name) !== -1)
        : users,
  },
  Mutation: {
    addTask: (_: any, { input }: { input: any }) => {
      const newTask = {
        id: tasks.length + 1,
        title: input.title,
        taskTypeId: parseInt(input.taskTypeId),
        executorId: parseInt(input.executorId),
        description: input.description,
        important: input.important,
      };

      tasks.push(newTask);

      return tasks.find((task) => task.id === tasks.length);
    },
    updateTask: (_: any, { id }: { id: any }, { input }: { input: any }) => {
      const task = tasks.find((task) => task.id === parseInt(id));

      if (task) {
        const newList = tasks.filter((task) => task.id === parseInt(id));
        const newTask = Object.assign(task, { ...input });
        newList.push(newTask);

        return newTask;
      }

      return null;
    },
  },
  Task: {
    taskType: (task: any) => {
      return taskTypes.find((taskType) => taskType.id === task.taskTypeId);
    },
    executor: (task: any) => {
      return users.find((user) => user.id === task.executorId);
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen(process.env.PORT, () => {
  console.log(`Server ready at ${process.env.PORT}`);
});
