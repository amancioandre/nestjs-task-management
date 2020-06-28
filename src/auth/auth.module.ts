import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'dev_secret',
            signOptions: {
                expiresIn: 3600,
            }
        }),
        PassportModule.register({
            defaultStrategy: 'jwt'
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}