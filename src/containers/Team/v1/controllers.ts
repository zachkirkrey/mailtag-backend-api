import { Request, Response } from 'express';
import * as TeamServices from './services';
import * as Utils from '@/utils';
import Middleware from '@/middleware';
import schema from './schema';

// TEAMS
export const createTeam = [
  Middleware.reqValidate(schema.createTeam),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.teamObj, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, TeamServices.createTeam(data));
  },
];

export const readTeam = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, TeamServices.readTeam(searchObj));
  },
];

export const readTeamById = [
  Middleware.reqValidate(schema.readTeamById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, TeamServices.readTeamById(+req.params.id));
  },
];

export const updateTeam = [
  Middleware.reqValidate(schema.updateTeam),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, TeamServices.updateTeam(+req.params.id, req.body));
  },
];
export const removeTeam = [
  Middleware.reqValidate(schema.removeTeam),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, TeamServices.removeTeam(+req.params.id));
  },
];

export const postGetTeamOwner = [
  Middleware.reqValidate(schema.postGetTeamOwner),
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = {
      userId: req.body.tokenUser.id,
      teamId: req.body.teamObj.teamId,
    };
    await Utils.controller.handler(req, res, TeamServices.postGetTeamOwner(searchObj));
  },
];

// TEAM ADMINS
export const createTeamAdmin = [
  Middleware.reqValidate(schema.createTeamAdmin),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.teamObj, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, TeamServices.createTeamAdmin(data));
  },
];

export const readTeamAdmins = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const finalObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, TeamServices.readTeamAdmins(finalObj));
  },
];

export const readTeamAdminById = [
  Middleware.reqValidate(schema.readTeamAdminById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, TeamServices.readTeamAdminById(+req.params.id));
  },
];
export const updateTeamAdmin = [
  Middleware.reqValidate(schema.updateTeamAdmin),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, TeamServices.updateTeamAdmin(+req.params.id, req.body));
  },
];
export const removeTeamAdmin = [
  Middleware.reqValidate(schema.removeTeamAdmin),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, TeamServices.removeTeamAdmin(+req.params.id));
  },
];

export const postGetAllTeamAdmins = [
  Middleware.reqValidate(schema.postGetAllTeamAdmins),
  async (req: Request, res: Response): Promise<void | Response> => {
    const finalObj = {
      userId: req.body.tokenUser.id,
      teamId: req.body.teamObj.teamId,
    };
    await Utils.controller.handler(req, res, TeamServices.postGetAllTeamAdmins(finalObj));
  },
];

// TEAM INVITES
export const createTeamInvite = [
  Middleware.reqValidate(schema.createTeamInvite),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { userId: req.body.tokenUser.id, ...req.body.teamObj };
    await Utils.controller.handler(req, res, TeamServices.createTeamInvite(data));
  },
];

export const readTeamInvites = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, TeamServices.readTeamInvites(searchObj));
  },
];

export const readTeamInviteById = [
  Middleware.reqValidate(schema.readTeamInviteById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, TeamServices.readTeamInviteById(+req.params.id));
  },
];

export const updateTeamInvite = [
  Middleware.reqValidate(schema.updateTeamInvite),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, TeamServices.updateTeamInvite(+req.params.id, req.body));
  },
];

export const removeTeamInvite = [
  Middleware.reqValidate(schema.removeTeamInvite),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, TeamServices.removeTeamInvite(+req.params.id));
  },
];

export const postGetTeamCount = [
  Middleware.reqValidate(schema.postGetTeamCount),
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { teamId: req.body.teamObj.teamId };
    await Utils.controller.handler(req, res, TeamServices.postGetTeamCount(searchObj));
  },
];

export const postSendTeamInvite = [
  Middleware.reqValidate(schema.postSendTeamInvite),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { userId: req.body.tokenUser.id, ...req.body.teamObj };
    await Utils.controller.handler(req, res, TeamServices.postSendTeamInvite(data));
  },
];

export const getTeamInviteAccepted = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id, isAccepted: true };
    await Utils.controller.handler(req, res, TeamServices.getTeamInviteAccepted(searchObj));
  },
];

// TEAM MEMBERS
export const createTeamMember = [
  Middleware.reqValidate(schema.createTeamMember),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.teamObj, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, TeamServices.createTeamMember(data));
  },
];

export const readTeamMembers = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, TeamServices.readTeamMembers(searchObj));
  },
];

export const readTeamMemberById = [
  Middleware.reqValidate(schema.readTeamMemberById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, TeamServices.readTeamMemberById(+req.params.id));
  },
];

export const updateTeamMember = [
  Middleware.reqValidate(schema.updateTeamMember),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.teamObj };
    await Utils.controller.handler(req, res, TeamServices.updateTeamMember(data, +req.params.id));
  },
];

export const removeTeamMember = [
  Middleware.reqValidate(schema.removeTeamMember),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, TeamServices.removeTeamMember(+req.params.id));
  },
];
