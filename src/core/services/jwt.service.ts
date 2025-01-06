import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {AuthTokenPayload} from '../../auth/types';
import {Injectable} from 'light-kite';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || '1h';
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || '30d';

@Injectable()
class JWTService {
  generateAccessToken(payload: any) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRES});
  }

  generateRefreshToken(payload: any) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRES});
  }

  verifyAccessToken(token: string): AuthTokenPayload {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as AuthTokenPayload;
  }

  verifyRefreshToken(token: string): AuthTokenPayload {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as AuthTokenPayload;
  }

}

export default JWTService;