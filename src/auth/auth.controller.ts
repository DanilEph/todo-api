import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signup(@Body() dto: AuthDto) {
    const result = await this.authService.signup(dto);
    return result;
  } 

  @Post('sign-in')
  async signin(@Body() dto: AuthDto) {
    const result = await this.authService.signin(dto);
    return result;
  }
}