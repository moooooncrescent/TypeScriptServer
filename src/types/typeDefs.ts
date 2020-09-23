const { gql } = require("apollo-server");

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
export default typeDefs;
