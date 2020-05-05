import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
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

  if (!authHeader) throw new Error('JWT token is missing');

  // Divide Bearer from Token

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jtw.secret);

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    console.log(decoded);

    return next();
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
}
