import { createConnection } from "typeorm";

const connection = () =>
  createConnection({
    type: "postgres",
    database: "tasks",
    url: process.env.POSTGRES_URL,
  });

export default connection;
