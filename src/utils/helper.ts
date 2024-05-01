import { UnauthorizedException } from '@nestjs/common';
import { compare, genSaltSync, hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { messages, config, UserPayload, Roles } from './index';

/**
 * compares plain password and password hash, and validates if both are same or not
 * it not same, throws an error, else resolves  true
 * @param plainPassword plain password received in request body
 * @param passwordHash
 */
export async function comparePassword(
  plainPassword: string,
  passwordHash: string,
) {
  const isMatched = await compare(plainPassword, passwordHash);
  return isMatched;
}

/**
 * returns hash of password
 * @param plainPassword - plain password
 * @param salt - salt
 */
export async function makeHash(
  plainPassword: string,
  salt: string,
): Promise<string | null> {
  return await hash(plainPassword, salt);
}

/**
 * generates salt of password
 * @param round - number of rounds (defaults to 10)
 */
export async function generateSalt(round = 10) {
  return genSaltSync(round);
}

export interface Sha512Interface {
  salt: string;
  passwordHash: string;
}

/**
 * returns generated salt and hash of user's plain password0
 * @param userPassword - user's password
 */
export async function generateSaltAndHash(
  userPassword: string,
): Promise<Sha512Interface> {
  const salt = await generateSalt();
  /** Gives us salt of length 16 */
  const passwordHash: string = (await makeHash(userPassword, salt)) as string;
  return {
    salt,
    passwordHash,
  };
}

export const generateJwt = async (
  email: string,
  role: Roles,
  user_id: string,
) => {
  const data: UserPayload = {
    email,
    role,
    id: user_id,
  };
  const generateToken = jwt.sign(data, config.jwtConf.JWT_SECRET, {
    algorithm: 'HS256',
    // expiresIn: parseInt(getEnv('JWT_EXPIRES_IN_SECONDS')) * 1000,
  });
  return generateToken;
};

export const jwtVerify = (token: string) => {
  return jwt.verify(token, config.jwtConf.JWT_SECRET, {
    algorithms: ['HS256'],
  });
};

export const validateJwt = (token: string, req: any) => {
  try {
    const data = assertJwt(token);
    req['user'] = data;
    return true;
  } catch (e) {
    return false;
  }
};

export const assertJwt = (token?: string) => {
  try {
    if (!token) throw new UnauthorizedException(messages.authRequired);
    if (token.includes('Bearer') === false) {
      throw new Error(messages.authShouldBearer);
    }
    const splitBearer = token.split(' ')[1];
    const jwt = jwtVerify(String(splitBearer)) as UserPayload;
    return jwt;
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      throw new Error(messages.tokenCouldNotBeParsed);
    }
    throw e;
  }
};
