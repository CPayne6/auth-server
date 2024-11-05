import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;
  
  @IsString()
  @IsOptional()
  @MaxLength(30)
  @MinLength(1)
  fname: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  @MinLength(1)
  lname: string;
}
