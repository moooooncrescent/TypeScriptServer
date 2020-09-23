"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var gql = require("apollo-server").gql;
var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Task {\n    id: ID\n    title: String\n    taskType: TaskType\n    executor: User\n    description: String\n    important: Boolean\n  }\n\n  input TaskInput {\n    title: String!\n    taskTypeId: ID!\n    executorId: ID!\n    description: String!\n    important: Boolean!\n  }\n\n  input TaskUpdateInput {\n    title: String\n    taskTypeId: Int\n    executorId: Int\n    description: String\n    important: Boolean\n  }\n\n  type TaskType {\n    id: ID\n    name: String\n  }\n\n  type Query {\n    tasks(name: String): [Task]\n    task(id: ID!): Task\n    taskTypes(name: String): [TaskType]\n    users(name: String): [User]\n  }\n\n  type Mutation {\n    addTask(input: TaskInput): Task\n    updateTask(id: ID!, input: TaskUpdateInput): Task\n  }\n\n  type User {\n    id: ID\n    name: String\n  }\n"], ["\n  type Task {\n    id: ID\n    title: String\n    taskType: TaskType\n    executor: User\n    description: String\n    important: Boolean\n  }\n\n  input TaskInput {\n    title: String!\n    taskTypeId: ID!\n    executorId: ID!\n    description: String!\n    important: Boolean!\n  }\n\n  input TaskUpdateInput {\n    title: String\n    taskTypeId: Int\n    executorId: Int\n    description: String\n    important: Boolean\n  }\n\n  type TaskType {\n    id: ID\n    name: String\n  }\n\n  type Query {\n    tasks(name: String): [Task]\n    task(id: ID!): Task\n    taskTypes(name: String): [TaskType]\n    users(name: String): [User]\n  }\n\n  type Mutation {\n    addTask(input: TaskInput): Task\n    updateTask(id: ID!, input: TaskUpdateInput): Task\n  }\n\n  type User {\n    id: ID\n    name: String\n  }\n"])));
exports["default"] = typeDefs;
var templateObject_1;