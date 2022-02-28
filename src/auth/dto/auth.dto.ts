import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  //! message:Optional
  @MaxLength(15, /*{ message: 'Username must be at most 15 characters long' } */)
  @MinLength(4)
  @IsString()
  @IsNotEmpty({
    message: 'Username is required',
  })
  username: string



  @MaxLength(15)
  @MinLength(8)
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string
}