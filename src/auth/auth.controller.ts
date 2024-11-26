import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // /auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup') // /auth/signup
  signup() {
    this.authService.signup();
  }

  @Post('signin') // /auth/signup
  signin() {
    this.authService.signin();
  }
}
