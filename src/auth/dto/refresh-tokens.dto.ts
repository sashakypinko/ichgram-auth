import {IsNotEmpty} from 'class-validator';

export class RefreshTokensDto {
  @IsNotEmpty({message: 'Refresh token is required'})
  refreshToken: string;
}