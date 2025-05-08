export interface SignInDto {
    email: string;
    password: string;
}

export interface ValidateTokenDto {
    token: string;
}

export interface RefreshTokenDto {
    idUser: number;
}

export interface UpdatePasswordDto {
    oldPassword: string;
    newPassword: string;
    idUser: number;
}
