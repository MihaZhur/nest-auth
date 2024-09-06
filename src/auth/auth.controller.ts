import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createAuthDto: AuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('signin')
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

}
