export class AuthDto {
  // use class-validator package to validate DTO objects
  
  // @IsRequired()
  username: string;
  
  // @IsRequired()
  password: string;
}
