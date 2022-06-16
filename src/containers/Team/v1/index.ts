import { Application } from 'express';
import * as Controller from './controllers';

export default (app: Application): void => {
  const v1Team = '/api/v1/team';
  const v1TeamAdmin = '/api/v1/team-admin';
  const v1TeamInvites = '/api/v1/team-invites';
  const v1TeamMembers = '/api/v1/team-members';

  // TEAMS
  app.get(`${v1Team}`, Controller.readTeam);
  app.get(`${v1Team}/:id`, Controller.readTeamById);
  app.post(`${v1Team}`, Controller.createTeam);
  app.put(`${v1Team}/:id`, Controller.updateTeam);
  app.delete(`${v1Team}/:id`, Controller.removeTeam);
  app.post(`${v1Team}/get-team-owner`, Controller.postGetTeamOwner);

  // TEAM ADMINS
  app.get(`${v1TeamAdmin}`, Controller.readTeamAdmins);
  app.get(`${v1TeamAdmin}/:id`, Controller.readTeamAdminById);
  app.post(`${v1TeamAdmin}`, Controller.createTeamAdmin);
  app.put(`${v1TeamAdmin}/:id`, Controller.updateTeamAdmin);
  app.delete(`${v1TeamAdmin}/:id`, Controller.removeTeamAdmin);
  app.post(`${v1TeamAdmin}/get-team-admins`, Controller.postGetAllTeamAdmins);

  // TEAM INVITES
  app.get(`${v1TeamInvites}`, Controller.readTeamInvites);
  app.get(`${v1TeamInvites}/:id`, Controller.readTeamInviteById);
  app.post(`${v1TeamInvites}`, Controller.createTeamInvite);
  app.put(`${v1TeamInvites}/:id`, Controller.updateTeamInvite);
  app.delete(`${v1TeamInvites}/:id`, Controller.removeTeamInvite);
  app.post(`${v1TeamInvites}/get-team-count`, Controller.postGetTeamCount);
  app.post(`${v1TeamInvites}/send-team-invite`, Controller.postSendTeamInvite);
  app.post(`${v1TeamInvites}/team-invite-accepted`, Controller.getTeamInviteAccepted);

  // TEAM MEMBERS
  app.get(`${v1TeamMembers}`, Controller.readTeamMembers);
  app.get(`${v1TeamMembers}/:id`, Controller.readTeamMemberById);
  app.post(`${v1TeamMembers}`, Controller.createTeamMember);
  app.put(`${v1TeamMembers}/:id`, Controller.updateTeamMember);
  app.delete(`${v1TeamMembers}/:id`, Controller.removeTeamMember);
};
