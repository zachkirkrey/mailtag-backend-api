import Joi from '@hapi/joi';
import joi from '@hapi/joi';
import { ROUTES } from './types';

const objects = {
  id: joi.number(),
  userId: Joi.number().required(),
  owner: Joi.string().required(),
  isDeleted: Joi.boolean(),
  isAccepted: Joi.boolean(),
  teamId: Joi.string(),
  email: Joi.string().email(),
};

const keysTypes = [...Object.keys(objects), ...Object.keys(objects).map((key) => `${key}?`)];

const generateSchema = (keys: typeof keysTypes) => {
  const schema = {};

  keys.forEach((key) => {
    if (objects[key]) {
      schema[key] = objects[key].required();
    }
    if (key.charAt(key.length - 1) === '?' && objects[key.slice(0, -1)]) {
      schema[key.slice(0, -1)] = objects[key.slice(0, -1)];
    }
  });

  return schema;
};

const schema: { [key in keyof typeof ROUTES]: joi.ObjectSchema } = {
  // TEAMS
  createTeam: joi.object({
    body: generateSchema(['userId', 'owner', 'isDeleted']),
  }),

  readTeamById: joi.object({
    params: generateSchema(['id']),
  }),

  updateTeam: joi.object({
    params: generateSchema(['id']),
    body: generateSchema(['userId', 'owner', 'isDeleted']),
  }),

  removeTeam: joi.object({
    params: generateSchema(['id']),
  }),

  postGetTeamOwner: joi.object({
    body: generateSchema(['teamId']),
  }),

  // TEAM ADMINS
  createTeamAdmin: joi.object({
    body: generateSchema(['teamId', 'email', 'isDeleted']),
  }),

  readTeamAdminById: joi.object({
    params: generateSchema(['id']),
  }),

  updateTeamAdmin: joi.object({
    params: generateSchema(['id']),
    body: generateSchema(['teamId', 'email', 'isDeleted']),
  }),

  removeTeamAdmin: joi.object({
    params: generateSchema(['id']),
  }),

  postGetAllTeamAdmins: joi.object({
    body: generateSchema(['teamId']),
  }),

  // TEAM INVITES
  createTeamInvite: joi.object({
    body: generateSchema(['teamId', 'email', 'isAccepted', 'isDeleted']),
  }),

  readTeamInviteById: joi.object({
    params: generateSchema(['id']),
  }),

  updateTeamInvite: joi.object({
    params: generateSchema(['id']),
    body: generateSchema(['teamId', 'email', 'isDeleted']),
  }),

  removeTeamInvite: joi.object({
    params: generateSchema(['id']),
  }),

  postGetTeamCount: joi.object({
    body: generateSchema(['teamId']),
  }),

  postSendTeamInvite: joi.object({
    body: generateSchema(['email', 'teamId']),
  }),

  // TEAM MEMBERS
  createTeamMember: joi.object({
    body: generateSchema(['teamId', 'email', 'isDeleted']),
  }),

  readTeamMemberById: joi.object({
    params: generateSchema(['id']),
  }),

  updateTeamMember: joi.object({
    params: generateSchema(['id']),
    body: generateSchema(['teamId', 'email', 'isDeleted']),
  }),

  removeTeamMember: joi.object({
    params: generateSchema(['id']),
  }),
};

export default schema;
