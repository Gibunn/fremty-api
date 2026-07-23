import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { Match } from "src/decorators/match.decorator";

export class CreateUserDTO {
    @IsEmail()
    @IsString({ message: 'Email must be type string' })
    @IsNotEmpty({ message: 'Email cannot be empty' })
    email!: string

    @IsString({ message: 'Username must be type string' })
    @IsNotEmpty({ message: 'Username cannot be empty' })
    username!: string

    @IsString({ message: 'Password must be type string' })
    @IsNotEmpty({ message: 'Password cannot be empty' })
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 1,
        minUppercase: 1,
    }, { message: 'Password is too weak. It must contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and symbols.', })
    password!: string

    @IsString({ message: 'Confirmation password must be type string' })
    @IsNotEmpty({ message: 'Confirmation password cannot be empty' })
    @Match('Password', { message: '' })
    confirm_password!: string;
}