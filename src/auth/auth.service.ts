import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDTO } from './dto/signin-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(uname: string, pass: string): Promise<SignInResponseDTO> {
    const user = await this.usersService.findOne(uname);
    if (user?.password !== pass) {
      throw new BadRequestException('Password does not match');
    }
    const { id, username } = user;
    return {
      id,
      username,
      accessToken: await this.jwtService.signAsync({
        id,
        username,
      }),
    };
  }
}
