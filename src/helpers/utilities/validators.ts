import { ResponseSignInDto, SearchDto } from "@/dto";

export const getAdministratorFromLocalStorage = () => {
    const administrator = JSON.parse(localStorage.getItem('user') ?? '{}') as ResponseSignInDto;
    return administrator;
}

export const verifyFilters = (searchDto: SearchDto) => {
    if (!searchDto.active && !searchDto.inactive) {
        return searchDto.active = true;
    }
}