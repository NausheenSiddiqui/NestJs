import { IsNotEmpty } from 'class-validator';

export class SignInRequestDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
