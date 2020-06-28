import { Repository, EntityRepository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Users } from "./user.entity";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        const { username, password } = authCredentialsDTO

        const user = new Users()
        user.username = username
        user.password = await this.hashPassword(password)

        try {
            await user.save()
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async login(authCredentialsDTO: AuthCredentialsDTO): Promise<string> {
        const { username, password } = authCredentialsDTO

        const user = await this.findOneOrFail({ username })

        if (await this.comparePassword(password, user.password)) {
            return user.username
        } else {
            return null
        }
    }
    
    private async hashPassword(password: string): Promise<string> {
        const salt = 12
        return await bcrypt.hash(password, salt)
    }

    private async comparePassword(password: string, passwordToCompare: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordToCompare)
    }
}