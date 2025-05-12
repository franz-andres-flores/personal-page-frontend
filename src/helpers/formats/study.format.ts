import { RowStudyDto } from "@/dto";
import { Study } from "@/entities";

export const formatRowStudyDto = (studies: Study[]): RowStudyDto[] => {
    return studies.map(x => {
        const row: RowStudyDto = {
            ...x,
            active: x.isActive ? 'Activo' : 'Inactivo',
        }

        return row;
    });
}