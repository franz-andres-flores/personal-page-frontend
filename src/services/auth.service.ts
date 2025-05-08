import { RefreshTokenDto, ResponseSignInDto, SignInDto, ValidateTokenDto, ValidateTokenResponseDto } from "@/dto";
import http from '@/helpers/http';

class AuthService {
    async signIn(signInDto: SignInDto): Promise<ResponseSignInDto> {
        const result = await http.post('/auth/sign-in', signInDto, { withCredentials: false });
        return result.data;
    }

    async validateToken(validateTolenDto: ValidateTokenDto): Promise<ValidateTokenResponseDto> {
        const result = await http.post('/auth/validate-token', validateTolenDto, { withCredentials: false });
        return result.data;
    }

    async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<ResponseSignInDto> {
        const result = await http.post('/auth/refresh-token', refreshTokenDto, { withCredentials: false });
        return result.data;
    }
}

export default new AuthService;