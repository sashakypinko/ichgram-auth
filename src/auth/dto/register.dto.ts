import {IsEmail, Length, IsNotEmpty} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, {message: 'Invalid email format'})
  email: string;
  
  @IsNotEmpty({message: 'Full Name is required'})
  fullName: string;
  
  @IsNotEmpty({message: 'Username is required'})
  username: string;

  @Length(8, 20, {message: 'Password must be between 8 and 20 characters'})
  password: string;
}