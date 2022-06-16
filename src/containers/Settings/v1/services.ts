import Models from '@/models';

// CONFIG KEYS
export const createConfigKeys = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.Settings.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readConfigKeys = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.Settings.findAll({
      where: {
        ...data,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readConfigKeysById = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.Settings.findByPk(id);
    return res;
  } catch (ex) {
    return ex;
  }
};

export const updateConfigKeys = async (id: number, data: object): Promise<unknown> => {
  try {
    const res = await Models.Settings.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};
export const removeConfigKeys = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.Settings.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

// APP CONFIG KEYS
export const createAppConfigKeys = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.Settings.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readAppConfigKeys = async (configObj: object): Promise<unknown> => {
  try {
    const res = await Models.Settings.findAll({
      where: {
        ...configObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readAppConfigKeysById = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.Settings.findByPk(id);
    return res;
  } catch (ex) {
    return ex;
  }
};

export const updateAppConfigKeys = async (id: number, data: object): Promise<unknown> => {
  try {
    const res = await Models.Settings.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};
export const removeAppConfigKeys = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.Settings.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

// ERRORS
export const createError = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.Errors.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readErrors = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.Errors.findAll({
      where: {
        ...data,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readErrorById = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.Errors.findByPk(id);
    return res;
  } catch (ex) {
    return ex;
  }
};

export const updateError = async (id: number, data: object): Promise<unknown> => {
  try {
    const res = await Models.Errors.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};
export const removeError = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.Errors.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};
