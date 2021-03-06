import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService) {}

    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return await this.userRepository.signUp(authCredentialsDTO)
    }

    async login(authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
        const username = await this.userRepository.login(authCredentialsDTO)

        if (!username) {
            throw new UnauthorizedException('Invalid credentials.')
        }

        const payload: JwtPayload = { username }
        const accessToken = await this.jwtService.sign(payload)

        return { accessToken }
    }
}
