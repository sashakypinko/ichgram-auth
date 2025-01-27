import {IsNotEmpty} from 'class-validator';

export class SendResetPasswordLinkDto {
  @IsNotEmpty({message: 'User name or email is required'})
  username: string;
}