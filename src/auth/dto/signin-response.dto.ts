import { Expose } from 'class-transformer';

export class SignInResponseDTO {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  accessToken: string;
}
