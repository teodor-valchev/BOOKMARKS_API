import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto';

@Controller('auth') // /auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup') // /auth/signup
  signup(@Body() dto: AuthDto) {
    // @Req() req: Request (don't use)it used  like this, it will be using just like Express

    this.authService.signup(dto);
  }

  @Post('signin') // /auth/signup
  signin() {
    this.authService.signin();
  }
}
