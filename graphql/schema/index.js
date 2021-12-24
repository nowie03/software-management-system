const {
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLBoolean,
} = require("graphql");
const { createBug, updateBug } = require("../resolvers/Bug");
const {
  getModule,
  getModules,
  createModule,
  updateModule,
  truncateModule,
} = require("../resolvers/Module");
const {
  getProject,
  getProjects,
  createProject,
  renameProject,
  truncateProject,
} = require("../resolvers/Project");
const {
  getSprint,
  getActiveSprint,
  getUpcomingSprints,
  getCompletedSprints,
  createSprint,
  updateSprint,
  setAsActiveSprint,
  addToCompletedSprints,
  addToUpcomingSprints,
  removeFromUpcomingSprints,
  truncateSprint,
} = require("../resolvers/Sprint");
const {
  getTasks,
  createTasks,
  updateTask,
  createTask,
  truncateTask,
} = require("../resolvers/Task");
const { getUser, createUser, updateUser } = require("../resolvers/user");
const BugType = require("./BugType").BugType;
const BugInputType = require("./inputTypes/BugInputType");
const ModuleInputType = require("./inputTypes/ModuleInputType");
const ProjectInputType = require("./inputTypes/ProjectInputType");
const SprintInputType = require("./inputTypes/SprintInputType");
const TaskInputType = require("./inputTypes/TaskInputType");
const ModuleType = require("./ModuleType").ModuleType;
const ProjectType = require("./ProjectType").ProjectType;
const SprintType = require("./SprintType").SprintType;
const TaskType = require("./TaskType").TaskType;
const UserType = require("./UserType");

const RootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Root Query Method",
  fields: () => ({
    getUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getUser,
    },
    getProject: {
      type: ProjectType,
      args: {
        projectId: { type: new GraphQLNonNull(GraphQLString) },
        projectName: { type: GraphQLString },
      },
      resolve: getProject,
    },
    getProjects: {
      type: new GraphQLList(ProjectType),
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getProjects,
    },
    getSprint: {
      type: SprintType,
      args: {
        projectId: { type: GraphQLString },
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
        sprintId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getSprint,
    },
    getActiveSprint: {
      type: SprintType,
      args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getActiveSprint,
    },
    getUpcomingSprints: {
      type: new GraphQLList(SprintType),
      args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getUpcomingSprints,
    },
    getComletedSprints: {
      type: new GraphQLList(SprintType),
      args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getCompletedSprints,
    },
    getModule: {
      type: ModuleType,
      args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getModule,
    },
    getModules: {
      type: new GraphQLList(ModuleType),
      args: {
        projectId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getModules,
    },
    getTasks: {
      type: new GraphQLList(TaskType),
      args: {
        sprintId: { type: GraphQLString },
        userId: { type: GraphQLString },
      },
      resolve: getTasks,
    },
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation Method",
  fields: () => ({
    createUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        workedOn: { type: new GraphQLList(GraphQLString) },
        ledOn: { type: new GraphQLList(GraphQLString) },
      },
      resolve: createUser,
    },
    updateUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        workedOn: { type: new GraphQLList(GraphQLString) },
        ledOn: { type: new GraphQLList(GraphQLString) },
        userId: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: updateUser,
    },
    createProject: {
      type: ProjectType,
      args: {
        type: { type: ProjectInputType },
      },
      resolve: createProject,
    },
    renameProject: {
      type: ProjectType,
      args: {
        projectId: { type: new GraphQLNonNull(GraphQLString) },
        newName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: renameProject,
    },
    truncateProject: {
      type: ProjectType,
      args: {
        projectId: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: truncateProject,
    },
    createModule: {
      type: ModuleType,
      args: {
        type: { type: ModuleInputType },
      },
      resolve: createModule,
    },
    updateModule: {
      type: ModuleType,
      args: {
        type: { type: ModuleInputType },
        moduleId: {type :new GraphQLNonNull(GraphQLString)}
      },
      resolve: updateModule,
    },
    truncateModule: {
      type: ModuleType,
      args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: truncateModule,
    },
    createSprint: {
      type: SprintType,
      args: {
        type: { type: SprintInputType },
      },
      resolve: createSprint,
    },
    updateSprint: {
      type: SprintType,
      args: {
        type: { type: SprintInputType },
        sprintId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: updateSprint,
    },
    setAsActiveSprint: {
      type: SprintType,
      args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
        sprintId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: setAsActiveSprint,
    },
    addToCompletedSprints: {
      type: SprintType,
      args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
        sprintId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: addToCompletedSprints,
    },
    addToUpcomingSprints: {
      type: SprintType,
      args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
        sprintId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: addToUpcomingSprints,
    },
    removeFromUpcomingSprints: {
      type: SprintType,
      args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
        sprintId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: removeFromUpcomingSprints,
    },
    truncateSprint: {
      type: SprintType,
      args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
        sprintId: { type: new GraphQLNonNull(GraphQLString) },
        shouldMigrateTasks: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: truncateSprint,
    },
    createTask: {
      type: TaskType,
      args: {
        type: { type: TaskInputType },
      },
      resolve: createTask,
    },
    updateTask: {
      type: TaskType,
      args: {
        type: { type: TaskInputType },
        taskId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: updateTask,
    },
    truncateTask: {
      type: TaskType,
      args: {
        sprintId: { type: new GraphQLNonNull(GraphQLString) },
        taskId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: truncateTask,
    },
    createBug: {
      type: BugType,
      args: {
        type: { type: BugInputType },
      },
      resolve: createBug,
    },
    updateBug: {
      type: BugType,
      args: {
        type: { type: BugInputType },
        bugId: {type:new GraphQLNonNull(GraphQLString)}
      },
      resolve: updateBug,
    },
    truncateBug: {
      type: BugType,
      args: {
        sprintId: { type: GraphQLString },
        taskId: { type: new GraphQLNonNull(GraphQLString) },
        bugId: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
  }),
});

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = Schema;
