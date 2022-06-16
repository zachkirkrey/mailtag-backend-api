import Models from '@/models';

// DOCUMENT APIS
export const getAllPingEmails = async (): Promise<unknown> => {
  return {};
};

export const read = async (params: object, searchObj: object): Promise<unknown> => {
  const res = await Models.PingSequences.findAll({
    where: {
      ...searchObj,
    },
  });
  return res;
};

export const create = async (data: object): Promise<unknown> => {
  const res = await Models.PingSequences.create({
    ...data,
  });
  return res;
};

export const putPingSequenceSettings = async (data: object, id: number): Promise<unknown> => {
  const res = await Models.PingSequences.update(data, {
    where: {
      id: id,
    },
  });
  return res;
};

export const postPingSequenceSettings = async (data: object): Promise<unknown> => {
  const res = await Models.PingSequences.create({
    ...data,
  });
  return res;
};

export const update = async (id: number, data: object): Promise<unknown> => {
  const res = await Models.PingSequences.update(data, {
    where: {
      id: id,
    },
  });
  return res;
};

export const deletePingSequenceDetails = async (id: number): Promise<unknown> => {
  const res = await Models.PingSequenceDetails.destroy({
    where: {
      id: id,
    },
  });
  return res;
};

export const getPingSequenceDetails = async (searchObj: object): Promise<unknown> => {
  const res = await Models.PingSequences.findAll({
    where: {
      ...searchObj,
    },
  });
  return res;
};

export const getPingSequenceSettings = async (searchObj: object): Promise<unknown> => {
  const res = await Models.PingSequences.findAll({
    where: {
      ...searchObj,
    },
  });
  return res;
};

export const remove = async (id: number): Promise<unknown> => {
  const res = await Models.PingSequences.destroy({
    where: {
      id: id,
    },
  });
  return res;
};

export const readById = async (id: number): Promise<unknown> => {
  const res = await Models.PingSequences.findByPk(id);
  return res;
};

export const getPingSequenceDetailsById = async (pingSequenceId: number): Promise<unknown> => {
  return {};
};

export const putPingSequenceDetails = async (data: object, id: number): Promise<unknown> => {
  const res = await Models.PingSequenceDetails.update(data, {
    where: {
      id: id,
    },
  });
  return res;
};

export const postPingSequenceDetails = async (data: object): Promise<unknown> => {
  const res = await Models.PingSequences.create({
    ...data,
  });
  return res;
};

export const getPingSequenceById = async (id: number): Promise<unknown> => {
  return {};
};

export const postPingEmail = async (pingEmailObj: object): Promise<unknown> => {
  return {};
};

export const postPingEmailMg = async (pingEmailObj: object): Promise<unknown> => {
  return {};
};

export const postStopPingEmail = async (pingEmailObj: object): Promise<unknown> => {
  return {};
};

export const postStopPingEmailMg = async (pingEmailObj: object): Promise<unknown> => {
  return {};
};

export const postTemporaryEmailBouncesWebhook = async (temporaryEmail: object): Promise<unknown> => {
  return {};
};

export const deletePingEmail = async (pingEmailObj: object): Promise<unknown> => {
  return {};
};

export const deletePingSequence = async (pingSequenceObj: object): Promise<unknown> => {
  return {};
};

export const postSendPingPreviewEmail = async (previewEmailObj: object): Promise<unknown> => {
  return {};
};

export const postPingEmailByDraftId = async (emailDraftObj: object): Promise<unknown> => {
  return {};
};

export const postPingsDetail = async (emailDraftObj: object): Promise<unknown> => {
  return {};
};

export const postMobilePingEmails = async (pingEmailObj: object): Promise<unknown> => {
  return {};
};

export const postMobileSearchPingEmailSummary = async (pingEmailObj: object): Promise<unknown> => {
  return {};
};

export const getSearchPingEmailSummary = async (): Promise<unknown> => {
  return {};
};

export const getRestartPingEmail = async (): Promise<unknown> => {
  return {};
};

export const postCustomDomainPings = async (domainPingObj: object): Promise<unknown> => {
  return {};
};

export const getCustomDomainPings = async (): Promise<unknown> => {
  return {};
};

export const getPingSequenceListByOffset = async (offset: number): Promise<unknown> => {
  return {};
};
