import { UserRole } from "@/helpers/enum";

export interface SignInDto {
    email: string;
    password: string;
}

export interface ResponseSignInDto {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    token: string;
    role: UserRole;
}

export interface MenuDto {
    menu_id: number;
    menu: string;
    path: string;
    icon: string;
}

export interface ValidateTokenDto {
    token: string;
}

export interface ValidateTokenResponseDto {
    status: boolean;
}

export interface RefreshTokenDto {
    idUser: number;
}

export interface UpdatePasswordDto {
    oldPassword: string;
    newPassword: string;
    idUser: number;
}
