import { createConnection } from "typeorm";

const connection = () =>
  createConnection({
    type: "postgres",
    database: "tasks",
    url: process.env.POSTGRES_URL,
    entities: [__dirname + "/../src/entity/*.model.js"],
    synchronize: true,
  });

export default connection;
