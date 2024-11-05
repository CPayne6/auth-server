import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string;
  
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  fname: string;

  @IsString()
  @MaxLength(30)
  @MinLength(1)
  lname: string;
}
