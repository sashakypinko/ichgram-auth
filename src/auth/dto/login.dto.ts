import {IsNotEmpty} from 'class-validator';

export class LoginDto {
  @IsNotEmpty({message: 'Username or email is required'})
  username: string;

  @IsNotEmpty({message: 'Password is required'})
  password: string;
}
