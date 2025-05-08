import { ResponseSignInDto } from "@/dto";

export const authHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user') || '') as ResponseSignInDto;
    return { 'Authorization': (userData) ? 'Bearer ' + userData?.token : '' };
}