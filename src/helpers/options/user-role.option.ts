import { OptionDto } from "@/dto";
import { UserRole } from "../enum";

const userRoles = [
    { value: UserRole.ADMIN, label: 'Administrador' },
    { value: UserRole.USER, label: 'Usuario' }
] as OptionDto[];

export const getUserRoles = (): OptionDto[] => {
    return userRoles;
}

export const getUserRoleOption = (value: number): OptionDto => {
    return userRoles.find((x) => x.value == value) ?? userRoles[1];
}