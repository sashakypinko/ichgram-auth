import {IsNotEmpty, Length, Matches} from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({message: 'Token is required'})
  token: string;

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