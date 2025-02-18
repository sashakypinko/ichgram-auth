import {IsEmail, Length, IsNotEmpty, Matches} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, {message: 'Invalid email format'})
  email: string;
  
  @IsNotEmpty({message: 'Full Name is required'})
  fullName: string;
  
  @IsNotEmpty({message: 'Username is required'})
  username: string;

  @IsNotEmpty({message: 'Password is required'})
  @Length(8, undefined, { message: 'Password must be at least 8 characters' })
  @Matches(/(?=(.*[A-Z]){2})/, {
    message: 'Password must contain at least 2 uppercase letters.',
  })
  @Matches(/(?=(.*[a-z]){2})/, {
    message: 'Password must contain at least 2 lowercase letters.',
  })
  @Matches(/(?=(.*\d){1})/, {
    message: 'Password must contain at least 1 number.',
  })
  @Matches(/(?=.*[@$!%*?&])/, {
    message: 'Password must contain at least 1 special character (@, $, !, %, *, ?, &).',
  })
  @Matches(/^[\w@$!%*?&]+$/, {
    message: 'Password can only contain letters, numbers, and @$!%*?& symbols.',
  })
  password: string;
}