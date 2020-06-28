import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from "class-validator"

export class AuthCredentialsDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {
        message: 'password must have at least one uppercase letter, one lowercase letter, one number and one special character.'
    })
    password: string
}