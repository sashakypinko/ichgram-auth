import * as bcrypt from 'bcryptjs';
import {Auth} from './auth.schema';
import {RegisterDto} from './dto/register.dto';
import {LoginDto} from './dto/login.dto';
import {AuthResponseDto} from './dto/auth-response.dto';
import { Inject, Injectable, UnauthorizedException } from 'light-kite';
import CoreService from '../core/services/core.service';
import {IUser} from '../core/models/user.model';
import JWTService from '../core/services/jwt.service';
import TYPES from '../types';
import ValidationException from 'light-kite/dist/exceptions/validation.exception';

@Injectable()
class AuthService {
  constructor(
    @Inject(TYPES.CoreService) private readonly coreService: CoreService,
    @Inject(TYPES.JWTService) private readonly jwtService: JWTService
  ) {}

  async register(data: RegisterDto, device: string): Promise<AuthResponseDto> {
    const existingUser: IUser | null = await this.coreService.getUserByUniqueFields({
      email: data.email,
      username: data.username,
    });

    if (existingUser) {
      const validationError: { username?: string, email?: string } = {};

      if (existingUser.username === data.username) {
        validationError.username = 'User with this username already exists';
      }

      if (existingUser.email === data.email) {
        validationError.email = 'User with this email already exists';
      }

      throw new ValidationException(validationError);
    }

    const salt = await bcrypt.genSalt(10);

    const user: IUser = await this.coreService.createUser({
      ...data,
      password: await bcrypt.hash(data.password, salt),
    });

    return this.authorize(user, device);
  }

  async login({username, password}: LoginDto, device: string): Promise<AuthResponseDto> {
    const user: IUser | null = await this.coreService.getUserByUniqueFields({ username, email: username });
    if (!user) throw new ValidationException({username: 'Invalid credentials'});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ValidationException({username: 'Invalid credentials'});

    return this.authorize(user, device);
  }

  async logout(refreshToken: string): Promise<void> {
    await Auth.deleteOne({refreshToken});
  }

  async refreshTokens(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const payload = this.jwtService.verifyRefreshToken(refreshToken);
      const authSession = await Auth.findOne({userId: payload.userId, refreshToken});
      const user: IUser | null = await this.coreService.getUserById(payload.userId);

      if (!user || !authSession) {
        throw new Error();
      }

      const tokenPayload = {userId: user._id, userScopes: user.scopes};

      const accessToken = this.jwtService.generateAccessToken(tokenPayload);
      const newRefreshToken = this.jwtService.generateRefreshToken(tokenPayload);

      authSession.refreshToken = newRefreshToken;
      await authSession.save();

      return {user, accessToken, refreshToken: newRefreshToken};
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async getUser(userId: string): Promise<IUser | null> {
    return this.coreService.getUserById(userId);
  }

  private async authorize(user: IUser, device: string): Promise<AuthResponseDto> {
    const tokenPayload = {
      userId: user._id,
      userScopes: user.scopes,
    };

    const accessToken = this.jwtService.generateAccessToken(tokenPayload);
    const refreshToken = this.jwtService.generateRefreshToken(tokenPayload);

    const authSession = new Auth({
      userId: user._id,
      refreshToken,
      device,
    });

    await authSession.save();

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}

export default AuthService;
