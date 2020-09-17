var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
require("dotenv").config();
var _a = require("apollo-server"), ApolloServer = _a.ApolloServer, gql = _a.gql;
var typeDefs = gql(__makeTemplateObject(["\n  type Task {\n    id: ID\n    title: String\n    taskType: TaskType\n    executor: User\n    description: String\n    important: Boolean\n  }\n\n  input TaskInput {\n    title: String!\n    taskTypeId: ID!\n    executorId: ID!\n    description: String!\n    important: Boolean!\n  }\n\n  input TaskUpdateInput {\n    title: String\n    taskTypeId: Int\n    executorId: Int\n    description: String\n    important: Boolean\n  }\n\n  type TaskType {\n    id: ID\n    name: String\n  }\n\n  type Query {\n    tasks(name: String): [Task]\n    task(id: ID!): Task\n    taskTypes(name: String): [TaskType]\n    users(name: String): [User]\n  }\n\n  type Mutation {\n    addTask(input: TaskInput): Task\n    updateTask(id: ID!, input: TaskUpdateInput): Task\n  }\n\n  type User {\n    id: ID\n    name: String\n  }\n"], ["\n  type Task {\n    id: ID\n    title: String\n    taskType: TaskType\n    executor: User\n    description: String\n    important: Boolean\n  }\n\n  input TaskInput {\n    title: String!\n    taskTypeId: ID!\n    executorId: ID!\n    description: String!\n    important: Boolean!\n  }\n\n  input TaskUpdateInput {\n    title: String\n    taskTypeId: Int\n    executorId: Int\n    description: String\n    important: Boolean\n  }\n\n  type TaskType {\n    id: ID\n    name: String\n  }\n\n  type Query {\n    tasks(name: String): [Task]\n    task(id: ID!): Task\n    taskTypes(name: String): [TaskType]\n    users(name: String): [User]\n  }\n\n  type Mutation {\n    addTask(input: TaskInput): Task\n    updateTask(id: ID!, input: TaskUpdateInput): Task\n  }\n\n  type User {\n    id: ID\n    name: String\n  }\n"]));
var taskTypes = [
    {
        id: 1,
        name: "Рабочая"
    },
    {
        id: 2,
        name: "Регулярная"
    },
];
var tasks = [
    {
        id: 1,
        title: "Чето",
        taskTypeId: 1,
        executorId: 1,
        description: "Сделай чето",
        important: true
    },
    {
        id: 2,
        title: "Еще чето",
        taskTypeId: 2,
        executorId: 2,
        description: "Сделай еще чето",
        important: true
    },
];
var users = [
    {
        id: 1,
        name: "Ярик"
    },
    {
        id: 2,
        name: "не Ярик"
    },
];
var resolvers = {
    Query: {
        tasks: function (_, _a) {
            var name = _a.name;
            return name !== undefined && name !== ""
                ? tasks.filter(function (task) { return task.title.search(name) !== -1; })
                : tasks;
        },
        task: function (_, _a) {
            var id = _a.id;
            return tasks.find(function (task) { return task.id === Number(id); });
        },
        taskTypes: function (_, _a) {
            var name = _a.name;
            return name !== undefined && name !== ""
                ? taskTypes.filter(function (taskType) { return taskType.name.search(name) !== -1; })
                : taskTypes;
        },
        users: function (_, _a) {
            var name = _a.name;
            return name !== undefined && name !== ""
                ? users.filter(function (user) { return user.name.search(name) !== -1; })
                : users;
        }
    },
    Mutation: {
        addTask: function (_, _a) {
            var input = _a.input;
            var newTask = {
                id: tasks.length + 1,
                title: input.title,
                taskTypeId: parseInt(input.taskTypeId),
                executorId: parseInt(input.executorId),
                description: input.description,
                important: input.important
            };
            tasks.push(newTask);
            return tasks.find(function (task) { return task.id === tasks.length; });
        },
        updateTask: function (_, _a, _b) {
            var id = _a.id;
            var input = _b.input;
            var task = tasks.find(function (task) { return task.id === parseInt(id); });
            if (task) {
                var newList = tasks.filter(function (task) { return task.id === parseInt(id); });
                var newTask = Object.assign(task, __assign({}, input));
                newList.push(newTask);
                return newTask;
            }
            return null;
        }
    },
    Task: {
        taskType: function (task) {
            return taskTypes.find(function (taskType) { return taskType.id === task.taskTypeId; });
        },
        executor: function (task) {
            return users.find(function (user) { return user.id === task.executorId; });
        }
    }
};
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen(process.env.PORT, function () {
    console.log("Server ready at " + process.env.PORT);
});
