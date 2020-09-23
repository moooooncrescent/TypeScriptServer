require("dotenv").config();
const { ApolloServer } = require("apollo-server");
import typeDefs from "./types/typeDefs";
import connection from "./typeorm.database";
import { getRepository } from "typeorm";
import { Task } from "./entity/task.model";
import { TaskType } from "./entity/taskType.model";
import { User } from "./entity/user.model";

connection()
  .then(() => {
    console.log("Database was connected.");
  })
  .catch((error) => {
    console.error("Database error:", error);
  });

const resolvers = {
  Query: {
    tasks: (_: any, { name }: { name: string }) =>
      Task.getRepository().find({ where: { title: name } }),
    task: (_: any, { id }: { id: string }) =>
      Task.getRepository().findOne({ where: { id: Number } }),
    taskTypes: (_: any, { name }: { name: string }) =>
      TaskType.getRepository().find({ where: { name: name } }),
    users: (_: any, { name }: any) =>
      User.getRepository().find({ where: { name: name } }),
  },
  Mutation: {
    addTask: (
      _: any,
      {
        input,
      }: {
        input: {
          title: string;
          taskTypeId: number;
          executorId: number;
          description: string;
          important: boolean;
        };
      }
    ) => {
      return Task.getRepository().save({ ...input });
    },
    updateTask: (
      _: any,
      {
        input,
        id,
      }: {
        id: number;
        input: {
          title: string;
          taskTypeId: number;
          executorId: number;
          description: string;
          important: boolean;
        };
      }
    ) => {
      console.log(id, input);
      return Task.getRepository().save({ ...input, id: Number(id) });
    },
  },
  Task: {
    taskType: (task: { taskTypeId: number }) =>
      TaskType.getRepository().findOne(task.taskTypeId),
    executor: (task: { executorId: number }) =>
      User.getRepository().findOne(task.executorId),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(process.env.PORT, () => {
  console.log(`Server ready at ${process.env.PORT}`);
});
