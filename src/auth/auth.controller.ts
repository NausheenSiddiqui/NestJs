import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDTO } from './dto/signin-request.dto';
import { SkipAuth } from './public-strategy';
import { SignInResponseDTO } from './dto/signin-response.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInRequestDto: SignInRequestDTO,
  ): Promise<SignInResponseDTO> {
    return this.authService.signIn(
      signInRequestDto.username,
      signInRequestDto.password,
    );
  }
}
