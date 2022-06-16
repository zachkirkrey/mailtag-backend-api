import Models from '@/models';
import Config from '@/config';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import bcrypt from 'bcrypt';
import passport from 'passport';
export const getGoogleLogin = async (): Promise<unknown> => {
  return passport.authenticate('google', { scope: ['profile', 'email'] });
};

export const getGoogleCallback = async (): Promise<unknown> => {
  return passport.authenticate('google', {
    successRedirect: '/login/success',
    failureRedirect: '/login/failed',
  });
};

export const getSession = async (): Promise<unknown> => {
  return {};
};

export const register = async (data: object): Promise<unknown> => {
  const isUserAvailable = await Models.Users.findOne({
    where: {
      email: data.email,
    },
  });

  if (isUserAvailable) {
    throw 'User already exist';
  }
  await Models.Users.create(data);
  return {};
};

export const login = async (data: object): Promise<unknown> => {
  const user = await Models.Users.findOne({
    where: {
      email: data.email.trim(),
    },
  });

  if (!user) {
    throw {
      code: 401,
      message: 'Invalid credentials',
    };
  }

  const matchPasswords = bcrypt.compareSync(user.password, data.password.trim());

  if (!matchPasswords) {
    throw {
      code: 401,
      message: 'Invalid credentials',
    };
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    Config.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );

  return {
    ...user.toJSON(),
    token,
  };
};

export const getmobileGoogleLogin = async (): Promise<unknown> => {
  return {};
};

export const getProfilePicByEmail = async (email: string): Promise<unknown> => {
  const res = await Models.ProfilePics.findOne({
    where: {
      userEmail: email,
    },
  });
  return res;
};

export const putUpdateUser = async (data: object, tokenUser): Promise<unknown> => {
  await Models.Users.update(data, { where: { id: tokenUser.id } });
  return {};
};

export const getDeleteUser = async (): Promise<unknown> => {
  return {};
};

export const postDeletingUser = async (userId: number): Promise<unknown> => {
  await Models.Users.update({ isDeleted: true }, { where: { id: userId } });
  return {};
};

export const getDeletingUserById = async (id: number): Promise<unknown> => {
  return {};
};

export const getUser = async (userId): Promise<unknown> => {
  await Models.Users.findOne({ where: { id: userId } });
  return {};
};

export const postUserDevice = async (data: object, userToken: object): Promise<unknown> => {
  // await Models.Users.update(
  //   {
  //     device_token: data.device_token,
  //   },
  //   { where: { id: data.id } }
  // );
  return {};
};

export const postMobileUserDevice = async (userDeviceObj: object): Promise<unknown> => {
  return {};
};

export const postMobileUserData = async (userObj: object): Promise<unknown> => {
  return {};
};

export const getTwitterCallback = async (): Promise<unknown> => {
  return {};
};

export const getFacebookCallback = async (): Promise<unknown> => {
  return {};
};

export const postSetAdmin = async (adminObj: object): Promise<unknown> => {
  return {};
};
