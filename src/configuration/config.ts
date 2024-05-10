import { ConfigProps } from './config.interface';

export const config = (): ConfigProps => ({
  jwtConstant: process.env.JWT_CONSTANT,
});
