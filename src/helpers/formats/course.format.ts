import { RowCourseDto } from "@/dto";
import { Course } from "@/entities";

export const formatRowCourseDto = (courses: Course[]): RowCourseDto[] => {
    return courses.map(x => {
        const row: RowCourseDto = {
            ...x,
            active: x.isActive ? 'Activo' : 'Inactivo',
        }

        return row;
    });
}