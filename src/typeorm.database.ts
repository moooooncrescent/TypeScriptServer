import { createConnection } from "typeorm";

import { User } from "./entity/user.model";
import { Task } from "./entity/task.model";
import { TaskType } from "./entity/taskType.model";
import { from } from "form-data";

const connection = () =>
  createConnection({
    type: "postgres",
    database: "tasks",
    url: process.env.POSTGRES_URL,
    entities: [__dirname + "/../../src/entity/*/.model.js"],

    synchronize: true,
  });

export default connection;
