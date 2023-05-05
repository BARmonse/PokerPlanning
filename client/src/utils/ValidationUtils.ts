import { SIX_CHARACTERS_PATTERN } from '../constants/constants';

export const validateRoomCode = (code: string) => {
  return SIX_CHARACTERS_PATTERN.test(code.trim());
};
