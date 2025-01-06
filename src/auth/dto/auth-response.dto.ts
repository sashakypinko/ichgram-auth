import {IUser} from '../../core/models/user.model';

export class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}