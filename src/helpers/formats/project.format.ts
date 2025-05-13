import { RowProjectDto } from "@/dto";
import { Project } from "@/entities";

export const formatRowProjectDto = (projects: Project[]): RowProjectDto[] => {
    return projects.map(x => {
        const row: RowProjectDto = {
            ...x,
            active: x.isActive ? 'Activo' : 'Inactivo',
        }

        return row;
    });
}