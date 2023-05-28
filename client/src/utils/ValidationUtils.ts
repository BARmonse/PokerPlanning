import { CODE_PATTERN, USERNAME_PATTERN } from '../constants/constants';

export const validateRoomCode = (code: string) => {
  return CODE_PATTERN.test(code.trim());
};

export const validateUsername = (username: string) => {
  return USERNAME_PATTERN.test(username.trim());
};
