import Models from '@/models';
import EventEmitter from '@/EventEmitter';

// DOCUMENT APIS
export const getSignatureCalculator = async (searchObj: object): Promise<unknown> => {
  const res = await Models.Signatures.count({ where: { ...searchObj } });
  return res;
};

export const postSignature = async (data: object): Promise<unknown> => {
  const res = await Models.Signatures.create({
    ...data,
  });

  return res;
};

export const postScheduleCall = async (callData: object): Promise<unknown> => {
  // SCHEDULE CALL CODE HERE
  return {};
};

export const create = async (data: object, tokenUser: object): Promise<unknown> => {
  let image = '';

  if (data?.image?.includes('https://s3.us-west-2.amazonaws.com/signature-images/')) {
    image = data.image;
  } else {
    image = `https://s3.us-west-2.amazonaws.com/signature-images/${data.image}`;
  }
  const res = await Models.Signatures.create({
    ...data,
    image,
    userId: tokenUser.id,
  });

  await Models.MilestoneEvents.create({
    userId: tokenUser.id,
    eventType: 7,
    isDeleted: false,
  });

  return res;
};
export const read = async (params: object, tokenUser: object): Promise<unknown> => {
  const res = await Models.Signatures.findAll({
    where: {
      userId: tokenUser.id,
    },
  });
  return res;
};
export const readById = async (id: number, tokenUser: object): Promise<unknown> => {
  const res = await Models.Signatures.findByPk(id);
  return res;
};
export const update = async (id: number, data: object, tokenUser: object): Promise<unknown> => {
  const res = await Models.Signatures.update(data, {
    where: {
      id: id,
    },
  });
  return res;
};
export const remove = async (id: number, tokenUser: object): Promise<unknown> => {
  const res = await Models.Signatures.destroy({
    where: {
      id: id,
    },
  });
  return res;
};

export const updateDefault = async (id: number, tokenUser: object): Promise<unknown> => {
  // Remove previous default signature
  const res = await Models.Signatures.update(
    { defaultSignature: false },
    {
      where: {
        userId: tokenUser.id,
        defaultSignature: true,
      },
    }
  );

  // Update default signature
  const res1 = await Models.Signatures.update(
    { defaultSignature: true },
    {
      where: {
        id: id,
      },
    }
  );
  return res1;
};

export const postGettingSignatureData = async (signatureObject: object, tokenUser): Promise<unknown> => {
  const user = await Models.Users.findByPk(tokenUser.id);
  const signature = await Models.Signatures.findByPk(signatureObject.id);

  return signature;
};

export const postSignatureCalculator = async (signatureCalObject: object): Promise<unknown> => {
  return {};
};

export const getSetDefaultSignature = async (): Promise<unknown> => {
  return {};
};

export const putSignatureCalculator = async (id: number, signatureCalObject: object): Promise<unknown> => {
  return {};
};

export const deleteSignatureCalculator = async (id: number): Promise<unknown> => {
  return {};
};

export const getSignatureEventV2 = async (): Promise<unknown> => {
  return {};
};

export const getSignatureEventById = async (email_id: number): Promise<unknown> => {
  return {};
};

export const postSendEmailSignature = async (emailSigObject: object): Promise<unknown> => {
  return {};
};
