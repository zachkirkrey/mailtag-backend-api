import Models from '@/models';

// TEAMS
export const createTeam = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.Teams.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readTeam = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Teams.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readTeamById = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.Teams.findByPk(id);
    return res;
  } catch (ex) {
    return ex;
  }
};

export const updateTeam = async (id: number, data: object): Promise<unknown> => {
  try {
    const res = await Models.Teams.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};
export const removeTeam = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.Teams.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const postGetTeamOwner = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Teams.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

// TEAM ADMINS
export const createTeamAdmin = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.TeamsAdmins.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readTeamAdmins = async (finalObj: object): Promise<unknown> => {
  try {
    const res = await Models.TeamsAdmins.findAll({
      where: {
        ...finalObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readTeamAdminById = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.TeamsAdmins.findByPk(id);
    return res;
  } catch (ex) {
    return ex;
  }
};

export const updateTeamAdmin = async (id: number, data: object): Promise<unknown> => {
  try {
    const res = await Models.TeamsAdmins.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};
export const removeTeamAdmin = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.TeamsAdmins.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const postGetAllTeamAdmins = async (finalObj: object): Promise<unknown> => {
  try {
    const res = await Models.TeamsAdmins.findAll({
      where: {
        ...finalObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

// TEAM INVITES
export const createTeamInvite = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.TeamInvites.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readTeamInvites = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.TeamInvites.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readTeamInviteById = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.TeamInvites.findByPk(id);
    return res;
  } catch (ex) {
    return ex;
  }
};

export const updateTeamInvite = async (id: number, data: object): Promise<unknown> => {
  try {
    const res = await Models.TeamInvites.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const removeTeamInvite = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.TeamInvites.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const postGetTeamCount = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.TeamInvites.count({
      where: { ...searchObj },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const postSendTeamInvite = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.TeamInvites.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getTeamInviteAccepted = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.TeamInvites.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

// TEAM MEMBERS
export const createTeamMember = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.TeamMembers.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readTeamMembers = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.TeamMembers.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readTeamMemberById = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.TeamMembers.findByPk(id);
    return res;
  } catch (ex) {
    return ex;
  }
};

export const updateTeamMember = async (data: object, id: number): Promise<unknown> => {
  try {
    const res = await Models.TeamMembers.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const removeTeamMember = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.TeamMembers.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};
