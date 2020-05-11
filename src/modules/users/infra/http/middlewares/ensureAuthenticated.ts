import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // JWT Token Validation

  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  // Divide Bearer from Token

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jtw.secret);

    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    // console.log(decoded);

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
