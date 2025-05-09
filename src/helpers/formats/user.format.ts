import { RowUserDto } from "@/dto";
import { User } from "@/entities";
import { getUserRoleOption } from "../options";

export const formatRowUserDto = (users: User[]): RowUserDto[] => {
    return users.map(x => {
        const row: RowUserDto = {
            ...x,
            roleLabel: getUserRoleOption(x.role).label,
            active: x.isActive ? 'Activo' : 'Inactivo'
        }

        return row;
    });
}