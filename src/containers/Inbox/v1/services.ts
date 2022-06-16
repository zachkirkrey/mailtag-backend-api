import Models from '@/models';

// DOCUMENT APIS
export const getReadedEmails = async (searchObj: object): Promise<unknown> => {
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

export const getUnreadedEmails = async (searchObj: object): Promise<unknown> => {
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

export const getNewSession = async (searchObj: object): Promise<unknown> => {
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
