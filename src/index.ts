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
    ) => Task.getRepository().save({ ...input }),
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
    ) => Task.getRepository().save({ ...input, id: id }),
  },
  Task: {
    taskType: (task: any) => TaskType.getRepository().find(), //не понял, как добавить сравнеие выбранного типа таска со списком из бд (tasktype выбранный при создании таски добавляется в промис и  из бд)
    executor: (task: any) => User.getRepository().find(),
  },
};

const server = new ApolloServer({ typeDefs });

server.listen(process.env.PORT, () => {
  console.log(`Server ready at ${process.env.PORT}`);
});
