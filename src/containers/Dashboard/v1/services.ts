import sequelize from 'sequelize';
import Models from '@/models';

// DOCUMENT API
export const getStatsInfo = async (searchObj: object): Promise<unknown> => {
  try {
    const Op = sequelize.Op;

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const currentDayCriteria = {
      ...searchObj,
      createdAt: now,
      isDeleted: false,
    };
    const openEmailCriteria = {
      ...searchObj,
      isReaded: true,
      isDeleted: false,
    };
    const currentMonthCriteria = {
      ...searchObj,
      createdAt: {
        [Op.gte]: firstDay,
        [Op.lte]: lastDay,
      },
    };

    const currentDayEmailCount = Models.Emails.count({
      where: { ...currentDayCriteria },
    });
    const currentMonthEmailCount = Models.Emails.count({
      where: { ...currentMonthCriteria },
    });

    const allEmailSentCount = Models.Emails.count({ where: { ...searchObj } });
    const openedEmailSentCount = Models.Emails.count({
      where: { ...openEmailCriteria },
    });
    const avgOpenRate = (+openedEmailSentCount / +allEmailSentCount) * 100;

    const allLinkCount = Models.Links.count({ where: { ...searchObj } });
    const clickedLinkCount = Models.LinkEvent.count({
      where: { ...openEmailCriteria },
    });
    const avgLinkClickRate = (+clickedLinkCount / +allLinkCount) * 100;

    const res = {
      currentDayEmailCount,
      currentMonthEmailCount,
      avgOpenRate,
      avgLinkClickRate,
    };

    return res;
  } catch (ex) {
    return ex;
  }
};

export const getGraphData = async (searchObj: object): Promise<unknown> => {
  try {
    const openEmailCriteria = {
      ...searchObj,
      isReaded: true,
      isDeleted: false,
    };
    const unOpenEmailCriteria = {
      ...searchObj,
      isReaded: false,
      isDeleted: false,
    };

    const sentEmail = Models.Emails.findAll({ where: { ...searchObj } });
    const openedEmailSentCount = Models.Emails.findAll({
      where: { ...openEmailCriteria },
    });
    const unOpenedEmailSentCount = Models.Emails.findAll({
      where: { ...unOpenEmailCriteria },
    });

    const res = {
      sentEmail,
      openedEmailSentCount,
      unOpenedEmailSentCount,
    };

    return res;
  } catch (ex) {
    return ex;
  }
};

function getFirstDayOfWeek(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

export const getRecentUnreadEmailsCount = async (searchObj: object): Promise<unknown> => {
  try {
    const Op = sequelize.Op;
    const now = new Date();

    const unOpenEmailCriteria = {
      ...searchObj,
      isReaded: false,
      createdAt: {
        [Op.gte]: getFirstDayOfWeek(new Date()),
        [Op.lte]: now,
      },
    };

    const res = Models.Emails.count({ where: { ...unOpenEmailCriteria } });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getGraphUnreadEmailsCount = async (searchObj: object): Promise<unknown> => {
  try {
    const Op = sequelize.Op;
    const now = new Date();

    const unOpenEmailCriteria = { ...searchObj, isReaded: false };

    const res = Models.Emails.count({ where: { ...unOpenEmailCriteria } });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getSignatureClicksCount = async (searchObj: object): Promise<unknown> => {
  try {
    const res = Models.Signatures.count({ where: { ...searchObj } });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const postSelectPlan = async (selectPlanObj: object): Promise<unknown> => {
  try {
    // STRIPE CODE HERE
    // const res = Models.Signatures.count({ where: { ...searchObj } });
    // return res;
  } catch (ex) {
    return ex;
  }
};

export const getSignatureById = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Signatures.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getOptimization = async (searchObj: object): Promise<unknown> => {
  try {
    // Set Criteria Here
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

export const getEmailCount = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Teams.count({
      ...searchObj,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getSignature = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Signatures.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getAllSignatures = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Signatures.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getTeamManagement = async (searchObj: object): Promise<unknown> => {
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

export const getDashboardOld = async (searchObj: object): Promise<unknown> => {
  try {
    // Set criteria here
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

export const getDashboard = async (searchObj: object): Promise<unknown> => {
  try {
    // Set criteria here
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

export const getShowSpecificSentEmailById = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getAccount = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Accounts.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getAllReadEmails = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getAllRecentUnreadEmails = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getUnreadEmails = async (searchObj: object): Promise<unknown> => {
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

export const getAllPreferences = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Preferences.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getUpgrade = async (searchObj: object): Promise<unknown> => {
  try {
    // set criteria here
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

export const getInvoice = async (searchObj: object): Promise<unknown> => {
  try {
    // set criteria here
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

export const getAllVideos = async (searchObj: object): Promise<unknown> => {
  try {
    // set criteria here
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

export const getReferAFriend = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Users.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getSupport = async (searchObj: object): Promise<unknown> => {
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

export const getAllPingEmails = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.PingEmails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getPingSequenceDetailsById = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.PingEmails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getStopPingEmailById = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.PingEmails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getShowSpecificSentPingById = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.PingEmails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};
