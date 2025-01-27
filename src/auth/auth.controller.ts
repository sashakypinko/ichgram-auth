import {Body, Controller, Post, ValidateDto, Headers, StatusCode, AuthOnly, Get, UserId, Inject} from 'light-kite';
import AuthService from './auth.service';
import {RegisterDto} from './dto/register.dto';
import {LoginDto} from './dto/login.dto';
import {AuthResponseDto} from './dto/auth-response.dto';
import {IUser} from '../core/models/user.model';
import {SendResetPasswordLinkDto} from './dto/send-reset-password-link.dto';
import {RefreshTokensDto} from './dto/refresh-tokens.dto';
import TYPES from '../types';
import {ResetPasswordDto} from './dto/reset-password.dto';

@Controller()
class AuthController {
  constructor(@Inject(TYPES.AuthService) private readonly authService: AuthService) {}

  @ValidateDto(RegisterDto)
  @StatusCode(201)
  @Post('sign-up')
  signUp(@Body() data: RegisterDto, @Headers('user-agent') device: string): Promise<AuthResponseDto> {
    return this.authService.register(data, device);
  }

  @ValidateDto(LoginDto)
  @Post('sign-in')
  signIn(@Body() data: LoginDto, @Headers('user-agent') device: string): Promise<AuthResponseDto> {
    return this.authService.login(data, device);
  }

  @AuthOnly()
  @Post('logout')
  async logout(@Headers('authorization') token: string): Promise<string> {
    await this.authService.logout(token.replace('Bearer ', '').trim());
    return 'Logged out';
  }

  @ValidateDto(RefreshTokensDto)
  @Post('refresh-tokens')
  async refreshTokens(@Body() { refreshToken }: RefreshTokensDto): Promise<AuthResponseDto> {
    return this.authService.refreshTokens(refreshToken);
  }

  @AuthOnly()
  @Get('get-user')
  async getUser(@UserId() userId: string): Promise<IUser | null> {
    return this.authService.getUser(userId);
  }

  @Post('send-reset-password-link')
  @ValidateDto(SendResetPasswordLinkDto)
  async sendResetPasswordLink(@Body() { username }: SendResetPasswordLinkDto): Promise<string> {
    return this.authService.sendResetPasswordLink(username);
  }

  @Post('reset-password')
  @ValidateDto(ResetPasswordDto)
  async resetPassword(@Body() { token, password }: ResetPasswordDto): Promise<string> {
    return this.authService.resetPassword(token, password);
  }
}

export default AuthController;