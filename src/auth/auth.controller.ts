import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        await this.authService.signUp(authCredentialsDTO)
    }

    @Post('login')
    async login(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
        return await this.authService.login(authCredentialsDTO)
    }
}
